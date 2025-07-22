import Joi from "joi"
import {configDotenv} from "dotenv"

configDotenv();
const mobileRegex=/^[0-9]{10}$/

// 1: admin registration schema
export const intialAdminRegisterSchema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    phone:Joi.string().pattern(mobileRegex).required(),
    secretCode:Joi.string().required()
})

//2: admin login schema

export const adminLoginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

// 3: admin change password

export const adminChangePasswordSchema=Joi.object({
    currentPassword:Joi.string().required(),
    newPassword:Joi.string().required(),
    confirmPassword:Joi.string().valid(Joi.ref("newPassword")).required(),
})