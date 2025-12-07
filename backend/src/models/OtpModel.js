import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
        enum: ["signup", "reset_password"],

    },
    otp: {
        type: String,
        length: 6,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ["owner", "customer","admin"],
    },
    expiresIn: {
        type: Date,
        required: true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }

})

const OtpModel = mongoose.model("OtpModel", schema);
export default OtpModel;