import Joi from "joi";

export const updateVehicleStatusSchema=Joi.object({
    status:Joi.string().valid('approved', 'rejected', "banned").required(),
    statusMessage:Joi.string().required(),
    specsLink:Joi.string(),
})