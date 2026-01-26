import mongoose from "mongoose";
import BaseService from "../../base/base.service.js";
import OtpModel from "./otp.model.js";
import AppError from "../../../utils/app-error.js"
import generateSecureOTP from "../../../utils/generateOtp.js";
import { EmailService } from "../../../providers/emails/index.js";

class OtpService extends BaseService {

    static populate = []

    static set = (model, entity, context) => {
        const log = context.logger;
        log.info(`processing OTP update for: ${entity._id}`)

        if (model.isVerified !== undefined) {
            entity.isVerified = model.isVerified
        }

        if (model.attempts !== undefined) {
            entity.attempts = model.attempts
        }

        if (model.lastAttemptAt !== undefined) {
            entity.lastAttemptAt = model.lastAttemptAt
        }

        return entity;
    }

    static get = async (id, context, options = {}) => {
        if (!id) { return }
        const log = context.logger;
        log.silly(`Inside GET service, with keyword:${id}`)

        let entity = null

        if (typeof (id) === "string") {
            log.silly(`Getting OTP with ID: ${id}`)
            if (mongoose.Types.ObjectId.isValid(id)) {
                entity = OtpModel.findById(id);
            }
        } else if (typeof (id) === "object") {
            log.silly(`Getting OTP with query:`, id)
            entity = OtpModel.findOne(id);
        }

        if (entity) {
            log.info(`OTP resource found, processing it for options`)
            if (options.populate) {
                entity = entity.populate(this.populate)
            }
            if (options.lean) {
                entity = entity.lean();
            }
            entity = await entity
        }
        return entity
    }

    static search = async (query, context, options = {}) => {
        const log = context.logger;

        let where = {};
        let sort = { createdAt: -1 }
        let { limit = 10, skip = 0 } = options.pagination || {};

        // Filter by email
        if (query.email) {
            where.email = query.email.toLowerCase()
        }

        // Filter by purpose
        if (query.purpose) {
            where.purpose = query.purpose
        }

        // Filter by role
        if (query.role) {
            where.role = query.role
        }

        // Filter by verification status
        if (query.isVerified !== undefined) {
            where.isVerified = query.isVerified
        }

        // Filter by expiration
        if (query.isExpired === true) {
            where.expiresIn = { $lt: new Date() }
        } else if (query.isExpired === false) {
            where.expiresIn = { $gte: new Date() }
        }

        log.silly(`Searching for OTPs with where=>${JSON.stringify(where)}`)
        const totalOtps = OtpModel.countDocuments(where);
        const otps = OtpModel.find(where).sort(sort).skip(skip).limit(limit);

        const [total, items] = await Promise.all([totalOtps, otps])

        log.info(`Found ${items.length} OTPs for query`)
        return { total, items, count: items.length }
    }

    static create = async (model, context, options = {}) => {
        const log = context.logger;
        const { email, purpose, role } = model

        log.info(`Creating OTP for email: ${email}, purpose: ${purpose}`)

        // Check if OTP already exists and is not expired
        const existingOtp = await this.get({ email: email.toLowerCase(), purpose, role, isVerified: false, expiresIn: { $gt: new Date() } }, context, { lean: true })
        if (existingOtp) {
            log.warn(`OTP already exists for ${email} with purpose ${purpose}`)
            throw new AppError(`OTP already sent to ${email} for ${purpose}. Please try again after some time.`, 400, "OTP_ALREADY_SENT");
        }

        // Generate OTP
        const { otp, expiresIn, createdAt } = generateSecureOTP()

        // Create OTP entity
        const entity = new OtpModel({
            email: email.toLowerCase(),
            purpose,
            role,
            otp,
            expiresIn,
            createdAt
        })

        await entity.save()
        log.info(`OTP created successfully: ${entity._id}`)

        // Send OTP via email
        try {
            const isMailSent = await EmailService({ to: email, purpose, otp });
            if (!isMailSent.success || isMailSent.success === false) {
                log.error(`Failed to send OTP email to ${email} for ${purpose}`)
                // Delete the OTP if email fails
                await OtpModel.deleteOne({ _id: entity._id })
                throw new AppError("Failed to send OTP email. Please try again later.", 500, "EMAIL_SEND_FAILED");
            }
            log.info(`OTP email sent to ${email}`)
        } catch (error) {
            log.error(`Email service error: ${error.message}`)
            // Delete the OTP if email fails
            await OtpModel.deleteOne({ _id: entity._id })
            throw error
        }

        return entity;
    }

    static verify = async (queryObj, otpValue, context) => {
        if (!queryObj) { return }
        const log = context.logger;
        log.silly(`Inside VERIFY service for OTP`)

        let entity = await this.get(queryObj, context, {});
        if (!entity) {
            log.warn(`No OTP found with query`)
            throw new AppError("Invalid OTP", 400, "INVALID_OTP")
        }

        // Check if OTP is expired
        if (new Date() > entity.expiresIn) {
            log.warn(`OTP expired for: ${entity.email}`)
            throw new AppError("OTP has expired", 400, "OTP_EXPIRED")
        }

        // Check if OTP is already verified
        if (entity.isVerified) {
            log.warn(`OTP already verified for: ${entity.email}`)
            throw new AppError("OTP already verified", 400, "OTP_ALREADY_VERIFIED")
        }

        // Check attempts limit
        if (entity.attempts >= 5) {
            log.warn(`Too many attempts for OTP: ${entity._id}`)
            throw new AppError("Too many failed attempts. OTP has been locked.", 400, "OTP_LOCKED")
        }

        // Check if OTP matches
        if (entity.otp !== otpValue) {
            entity.attempts += 1
            entity.lastAttemptAt = new Date()
            await entity.save()
            log.warn(`Invalid OTP attempt for: ${entity.email}, Attempts: ${entity.attempts}`)
            throw new AppError("Invalid OTP", 400, "INVALID_OTP")
        }

        // Mark as verified
        entity.isVerified = true
        await entity.save()
        log.info(`OTP verified successfully for: ${entity.email}`)

        return entity
    }

    static update = async (id, model = {}, context) => {
        if (!id) { return }
        const log = context.logger;
        log.silly(`Inside UPDATE service, with keyword:${id}`)

        let entity = await this.get(id, context, {});
        if (!entity) {
            log.warn(`No OTP found with: ${id}`)
            throw new AppError("No OTP found", 404, "RESOURCE_NOT_FOUND")
        }

        entity = await this.set(model, entity, context);
        await entity.save();

        log.info(`OTP updated successfully: ${entity._id}`)
        return entity
    }
}

export default OtpService