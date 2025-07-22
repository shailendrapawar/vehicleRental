import Joi from "joi";

// 1: send Otp schema
export const sendOtpSchema=Joi.object({
    email:Joi.string().email().required(),
    role:Joi.string().valid("admin","customer","owner").required(),
    purpose:Joi.string().valid("login","signup","verification","reset_password")
})

// Verify otp schema
export const verifyOtpSchema=Joi.object({
    email:Joi.string().email().required(),
    role:Joi.string().valid("admin","customer","owner").required(),
    purpose:Joi.string().valid("login","signup","verification","reset_password"),
    code:Joi.string().length(6).required()
})