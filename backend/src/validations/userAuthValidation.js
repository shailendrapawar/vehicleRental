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
    code:Joi.string().length(4).required()
})


// user-login schema
export const userLoginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})


export const userRegistrationSchema=Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    registerAs:Joi.string().valid("owner","customer"),
    dob:Joi.date().required(),
    registerOtp:Joi.string().length(4).required()
})