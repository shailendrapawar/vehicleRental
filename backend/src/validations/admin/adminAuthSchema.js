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
