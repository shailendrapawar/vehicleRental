import BaseController from "../../base/base.controller.js"
import logger from "../../../utils/logger.js";
import { buildPagination } from "../../../helpers/requestHelper.js"
import contextBuilder from "../../../utils/contextBuilder.js"

import OtpService from "./otp.service.js"
import { sendOTPSchema, verifyOTPSchema } from "./otp.validator.js"
import generateSecureOTP from "../../../utils/generateOtp.js";
import { EmailService } from "../../../providers/emails/index.js";

class OtpController extends BaseController {

    static MODULE = "OTP";

    static sendOTP = async (req, res) => {
        try {
            let context = contextBuilder(req)
            const log = context.logger;
            log.info(`Accessing ${this.MODULE}:sendOTP module`)

            if (!OtpService.create) {
                throw new Error("Method not supported");
            }

            // Validate request body
            const { error, value } = sendOTPSchema.validate(req.body)
            if (error) {
                log.error(error)
                return this.handleError(res, 400, error)
            }

            const { email, purpose } = value

            log.info(`OTP request received for ${email} for ${purpose}`)

            // Send to otp servive
            const data = await OtpService.create(value, context)

            if (!data) {
                return this.handleError(res, 400, { message: "OTP creation failed, please try later" })
            }

            log.success(`OTP email sent to ${email} for ${purpose}`)
            return this.handleResponse(res, 200, `OTP sent to ${email}`, { email })
        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }

    static verifyOTP = async (req, res) => {
        try {
            let context = contextBuilder(req)
            const log = context.logger;
            log.info(`Accessing ${this.MODULE}:verifyOTP module`)

            if (!OtpService.verify) {
                throw new Error("Method not supported");
            }

            // Validate request body
            const { error, value } = verifyOTPSchema.validate(req.body)
            if (error) {
                log.error(error)
                return this.handleError(res, 400, error)
            }

            const { email, purpose, role, otp } = value

            log.info(`Verifying OTP for ${email} with purpose ${purpose}`)

            // Build query object to find OTP
            const queryObj = {
                email: email.toLowerCase(),
                purpose,
                role,
                isVerified: false,
                expiresIn: { $gt: new Date() }
            }

            // Verify OTP
            const data = await OtpService.verify(queryObj, otp, context)

            if (!data) {
                return this.handleError(res, 400, { message: "Invalid or expired OTP" })
            }

            log.info(`OTP verified successfully for ${email}`)
            return this.handleResponse(res, 200, "OTP verified successfully", { email, purpose })

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, error)
        }
    }

    static search = async (req, res) => {
        try {
            const context = contextBuilder(req);
            const log = context.logger;
            log.info(`Accessing ${this.MODULE}:search module`)

            if (!OtpService.search) {
                throw new Error("Method not supported");
            }

            let options = {};
            options.pagination = buildPagination(req)

            const data = await OtpService.search(req.query, context, options)

            return this.handleResponse(res, 200, "OTPs found", data);

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }

    static get = async (req, res) => {
        try {
            let context = contextBuilder(req)
            const log = context.logger;
            log.info(`Accessing ${this.MODULE}:get module`)

            if (!OtpService.get) {
                throw new Error("Method not supported");
            }

            const otp = await OtpService.get(req.params.id, context, { lean: false, populate: true });

            if (!otp) {
                return this.handleResponse(res, 404, `No OTP found with ${req?.params?.id}.`)
            }

            return this.handleResponse(res, 200, "OTP found", otp)
        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }
}

export default OtpController