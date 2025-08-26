import Joi from "joi"

export const updateShopStatusSchema=Joi.object({
    status:Joi.string().valid('approved', 'rejected', "banned","pending").required(),
    statusMessage:Joi.string().required(),
})