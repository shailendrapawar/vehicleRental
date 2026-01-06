import mongoose from "mongoose";
import OtpModel from "./otp.model.js";
class OtpService {

    static create = async (model, data = {}) => {
        const newOtp = new OtpModel({
            email: data.email,
            purpose: data.purpose,
            otp: data.otp,
            role: data.role,
            isVerified: data.isVerified || false,
            expiresIn: data.expiresIn,
            createdAt: data.createdAt || new Date(),
        })
        return await newOtp.save();
    }

    static get = async (model, filters = {}, options = {}) => {
        // return await OtpModel.findOne(filter).lean();    
        let result;
        const query = model.findOne(filters)
            .populate(options.populate)
            .select(options.select || "")

        if (options.lean) {
            query.lean();
        }

        result = await query;
        return result;
    }

    static search = async (model, filter = {}, options = {}) => {

    }

    static update = async (model, filter = {}, updateData = {}, options = {}) => {

    }
}

export default OtpService;