import mongoose from "mongoose";
import { OTP_PUROPSES } from "../../../constants/otp"
const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
        enum: OTP_PUROPSES,

    },
    otp: {
        type: String,
        length: 6,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["owner", "customer", "admin"],
    },
    expiresIn: {
        type: Date,
        required: true
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }

})

const OtpModel = mongoose.model("Otp", schema);
export default OtpModel;