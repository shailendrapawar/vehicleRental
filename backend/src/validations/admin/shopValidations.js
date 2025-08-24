import Joi from "joi"

export const rejectVehicleSchema=Joi.object({
   shopId:Joi.string().required(),
   statusMessage:Joi.string().required()
})

export const banVehicleSchema=Joi.object({
   shopId:Joi.string().required(),
   statusMessage:Joi.string().required()
})


export const updateShopStatusSchema=Joi.object({
    status:Joi.string().valid('approved', 'rejected', "banned","pending").required(),
    statusMessage:Joi.string().required(),
})