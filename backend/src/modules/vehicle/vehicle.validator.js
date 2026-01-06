import Joi from "joi"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const registrationNumberRegex = /^[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{1,4}$/i;

export const createVehicleSchema = Joi.object({
    // 1: ownership details
    //owner : get owner id from req
    shopId: Joi.string().pattern(objectIdRegex).required(),


    // 2:identiification fields
    registrationNumber: Joi.string().pattern(registrationNumberRegex).required(),
    vehicleType: Joi.string().lowercase().valid("bike", "scooty", "car").required(),
    brand: Joi.string().lowercase().required(),
    model: Joi.string().lowercase().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
    color:Joi.string().valid('white','black','grey','silver','red','blue','green','yellow','brown','beige','gold','orange'),

    //3: specs fields
    fuelType: Joi.string().lowercase().valid("petrol", "diesel", "electric", "hybrid").required(),
    transmission: Joi.string().lowercase().valid("manual", "automatic").required(),
    seatingCapacity: Joi.number().min(2).max(9).required(),
    mileage: Joi.string(),

})

export const updateVehicleSchema=Joi.object({

    // for admin and shop owner 
    operationalStatus: Joi.string().lowercase().valid('available', 'booked', 'maintenance', 'out_of_service'),
    isListed: Joi.boolean(),

    //for admin only
    status: Joi.string().lowercase().valid('pending', 'approved', 'rejected'),
    statusMessage: Joi.string().allow(""),
})