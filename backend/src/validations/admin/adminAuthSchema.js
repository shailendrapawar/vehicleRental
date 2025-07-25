import Joi from "joi"
import {configDotenv} from "dotenv"

configDotenv();
const mobileRegex=/^[0-9]{10}$/

// 1: admin registration schema
export const intialAdminRegisterSchema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    secretCode:Joi.string().required()
})


// 2: admin change password

export const adminChangePasswordSchema=Joi.object({
    currentPassword:Joi.string().required(),
    newPassword:Joi.string().required(),
    confirmPassword:Joi.string().valid(Joi.ref("newPassword")).required(),
})