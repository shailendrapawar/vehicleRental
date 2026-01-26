import mongoose from "mongoose";
import { OTP_PUROPSES } from "../../../constants/otp.js"
import { USER_ROLES } from "../../../constants/user.js"

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            index: true
        },
        purpose: {
            type: String,
            required: [true, "Purpose is required"],
            enum: OTP_PUROPSES,
        },
        otp: {
            type: String,
            length: 6,
            required: [true, "OTP is required"],
        },
        role: {
            type: String,
            required: [true, "Role is required"],
            enum: USER_ROLES,
        },
        expiresIn: {
            type: Date,
            required: [true, "Expiration time is required"],
            index: true
        },
        isVerified: {
            type: Boolean,
            default: false,
            index: true
        },
        attempts: {
            type: Number,
            default: 0,
            max: 5
        },
        lastAttemptAt: {
            type: Date
        }
    },
    { timestamps: true }
);

// // Create a TTL index to auto-delete expired OTPs
// otpSchema.index(
//     { expiresIn: 1 },
//     { expireAfterSeconds: 0 }
// );

const OtpModel = mongoose.model("Otp", otpSchema);
export default OtpModel;