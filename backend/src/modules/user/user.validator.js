import Joi from "joi"
import { USER_ROLES, USER_STATUSES } from "../../constants/user.js"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z\s]{2,50}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const createUserSchema = Joi.object({
    name: Joi.string().regex(nameRegex).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.pattern.base": "Name must be 2-50 characters and contain only letters and spaces"
    }),

    email: Joi.string().regex(emailRegex).lowercase().trim().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.pattern.base": "Email must be a valid email address"
    }),

    password: Joi.string().min(8).required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long"
    }),

    role: Joi.string()
        .valid(...USER_ROLES)
        .default("customer")
        .messages({
            "any.only": "Role must be one of: admin, owner, customer",
            "string.base": "Role must be a string"
        }),

    dob: Joi.date().messages({
        "date.base": "Date of birth must be a valid date"
    })
}).unknown(false)

export const updateUserSchema = Joi.object({
    name: Joi.string().regex(nameRegex).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.pattern.base": "Name must be 2-50 characters and contain only letters and spaces"
    }),

    email: Joi.string().regex(emailRegex).lowercase().trim().messages({
        "string.base": "Email must be a string",
        "string.pattern.base": "Email must be a valid email address"
    }),

    dob: Joi.date().messages({
        "date.base": "Date of birth must be a valid date"
    }),

    status: Joi.string()
        .lowercase()
        .valid(...USER_STATUSES)
        .messages({
            "string.base": "Status must be a text value",
            "any.only": "Invalid status code",
            "string.empty": "Status cannot be empty"
        }),

    statusMessage: Joi.string().min(5).max(200).messages({
        "string.base": "Status message must be a string",
        "string.min": "Status message must be at least 5 characters",
        "string.max": "Status message cannot exceed 200 characters"
    }),

    role: Joi.string()
        .valid(...USER_ROLES)
        .messages({
            "any.only": "Role must be one of: admin, owner, customer",
            "string.base": "Role must be a string"
        })
}).unknown(false)
