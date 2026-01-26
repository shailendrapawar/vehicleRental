import Joi from "joi"
import { OTP_PUROPSES } from "../../../constants/otp.js"
import { USER_ROLES } from "../../../constants/user.js"

export const sendOTPSchema = Joi.object({
    email: Joi.string()
        .email()
        .lowercase()
        .trim()
        .required()
        .messages({
            "string.base": "Email must be a string",
            "string.empty": "Email is required",
            "string.email": "Please provide a valid email address"
        }),
    purpose: Joi.string()
        .valid(...OTP_PUROPSES)
        .required()
        .messages({
            "string.empty": "Purpose is required",
            "any.only": `Purpose must be one of: ${OTP_PUROPSES.join(", ")}`
        }),
    role: Joi.string()
        .valid(...USER_ROLES)
        .required()
        .messages({
            "string.empty": "Role is required",
            "any.only": `Role must be one of: ${USER_ROLES.join(", ")}`
        })
}).unknown(false)

export const verifyOTPSchema = Joi.object({
    email: Joi.string()
        .email()
        .lowercase()
        .trim()
        .required()
        .messages({
            "string.base": "Email must be a string",
            "string.empty": "Email is required",
            "string.email": "Please provide a valid email address"
        }),
    purpose: Joi.string()
        .valid(...OTP_PUROPSES)
        .required()
        .messages({
            "string.empty": "Purpose is required",
            "any.only": `Purpose must be one of: ${OTP_PUROPSES.join(", ")}`
        }),
    role: Joi.string()
        .valid(...USER_ROLES)
        .required()
        .messages({
            "string.empty": "Role is required",
            "any.only": `Role must be one of: ${USER_ROLES.join(", ")}`
        }),
    otp: Joi.string()
        .length(6)
        .pattern(/^[0-9]{6}$/)
        .required()
        .messages({
            "string.empty": "OTP is required",
            "string.length": "OTP must be exactly 6 characters",
            "string.pattern.base": "OTP must contain only digits"
        })
}).unknown(false)
