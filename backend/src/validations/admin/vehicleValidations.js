import Joi from "joi";

export const updateVehicleStatusSchema=Joi.object({
    status:Joi.string().valid('pending', 'approved', 'rejected').required(),
    reason:Joi.string().required("")
})