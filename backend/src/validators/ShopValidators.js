import Joi from "joi"


import { stateArr } from "../utils/statesData.js";
const mobileNumberRegex = /^[6-9]\d{9}$/;
const gstNumberRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export const createShopSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        "string.base": "Shop name must be a string",
        "string.empty": "Shop name is required",
        "string.min": "Shop name must be at least 2 characters",
        "string.max": "Shop name cannot exceed 100 characters"
    }),

    // contact: Joi.string().pattern(mobileNumberRegex).required().messages({
    //     "string.empty": "Contact number is required",
    //     "string.pattern.base": "Contact number must be a valid Indian mobile number"
    // }),
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a valid string",
        "string.empty": "Email is required",
        "string.email": "Please enter a valid email address"
    }),



    gstNumber: Joi.string().regex(gstNumberRegex).required().messages({
        "string.empty": "GST number is required",
        "string.pattern.base": "GST number must be a valid 15-character GSTIN"
    }),



    address: Joi.string().min(5).max(200).required().messages({
        "string.base": "Address must be a string",
        "string.empty": "Address is required",
        "string.min": "Address must be at least 5 characters long"
    }),
    state: Joi.string()
        .valid(...stateArr)
        .required()
        .messages({
            "any.only": "State must be a valid Indian state or union territory",
            "string.empty": "State is required"
        }),
    city: Joi.string().pattern(/^[A-Za-z\s]+$/).min(2).max(50).required().messages({
        "string.pattern.base": "City should only contain alphabets",
        "string.empty": "City is required"
    }),

    pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).required().messages({
        "string.pattern.base": "Pincode must be a valid 6-digit Indian pincode",
        "string.empty": "Pincode is required"
    }),


    lat: Joi.number().min(-90).max(90).required().messages({
        "number.base": "Latitude must be a number",
        "number.min": "Latitude must be >= -90",
        "number.max": "Latitude must be <= 90"
    }),
    lng: Joi.number().min(-180).max(180).required().messages({
        "number.base": "Longitude must be a number",
        "number.min": "Longitude must be >= -180",
        "number.max": "Longitude must be <= 180"
    })


})

export const updateShopSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).messages({
        "string.base": "Shop name must be a string",
        "string.empty": "Shop name is required",
        "string.min": "Shop name must be at least 2 characters",
        "string.max": "Shop name cannot exceed 100 characters"
    }),
    address: Joi.string().min(5).max(200).messages({
        "string.base": "Address must be a string",
        "string.min": "Address must be at least 5 characters long"
    }),
    status: Joi.string()
        .lowercase()
        .valid("approved", "pending", "banned", "inactive").$.messages({
            "string.base": "Status must be a text value",
            "any.only": "Invalid status code",
            "string.empty": "Status cannot be empty"
        }),

    statusMessage: Joi.string().min(10).max(200).messages({
        "string.base": "Status message must be a string",
        "string.min": "Status message must be at least 10 characters",
        "string.max": "Status message cannot exceed 200 characters"
    }),
}).unknown(false)