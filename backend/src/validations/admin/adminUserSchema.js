import Joi from "joi";
 
export const updateUserStatus=Joi.object({
    status:Joi.string().valid('approved','banned').required(),
    statusMessage:Joi.string().required()
})