import Joi from "joi"

export const initializeAdminSchema=Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  password: Joi.string().min(6).messages({
    "string.empty": "Password is required",
    "string.min": "Password should be at least 8 characters",
  }),
  dob: Joi.date(),
  token:Joi.string().required()
})


export const userRegistrationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  password: Joi.string().min(6).messages({
    "string.empty": "Password is required",
    "string.min": "Password should be at least 8 characters",
  }),
  otp: Joi.string().length(6).required().messages({
    "string.empty": "OTP is required",
    "string.length": "OTP should be 6 characters",
  }),

  registerAs: Joi.string().valid("customer", "owner").default("pending"),
  dob: Joi.date()
})

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
})

// SEND otp schema
export const sendOTPSchema = Joi.object({ 
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  purpose:Joi.string().valid("signup","reset_password").required(),
  role:Joi.string().valid("customer","owner","admin").required()
})

// otp schema
export const verifyOTPSchema = Joi.object({ 
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  purpose:Joi.string().valid("signup","reset_password").required(),
  role:Joi.string().valid("customer","owner","admin").required(),
  otp:Joi.string().length(6).required()
})