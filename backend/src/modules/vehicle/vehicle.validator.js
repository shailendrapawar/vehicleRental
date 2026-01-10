import Joi from "joi"

import { VEHICLE_STATUSES, OPERATIONAL_STATUSES } from "../../constants/vehicle.js"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const registrationNumberRegex = /^[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{1,4}$/i;

export const createVehicleSchema = Joi.object({
    // 1: ownership details
    //owner : get owner id from req
    shopId: Joi.string().pattern(objectIdRegex).required(),

    // 2:identiification fields
    registrationNumber: Joi.string().pattern(registrationNumberRegex).lowercase().required(),
    vehicleType: Joi.string().lowercase().valid("bike", "scooty", "car").required(),
    brand: Joi.string().lowercase().required(),
    model: Joi.string().lowercase().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
    color: Joi.string().valid('white', 'black', 'grey', 'silver', 'red', 'blue', 'green', 'yellow', 'brown', 'beige', 'gold', 'orange'),

    //3: specs fields
    fuelType: Joi.string().lowercase().valid("petrol", "diesel", "electric", "hybrid").required(),
    transmission: Joi.string().lowercase().valid("manual", "automatic").required(),
    seatingCapacity: Joi.number().min(2).max(9).required(),
    mileage: Joi.string(),

})

export const updateVehicleSchema = Joi.object({

    // 4: status managemnet
    status: Joi.string()
        .lowercase()
        .valid(...VEHICLE_STATUSES).$.messages({
            "string.base": "Status must be a text value",
            "any.only": "Invalid status code",
            "string.empty": "Status cannot be empty"
        }),

    statusMessage: Joi.string().min(10).max(200).messages({
        "string.base": "Status message must be a string",
        "string.min": "Status message must be at least 10 characters",
        "string.max": "Status message cannot exceed 200 characters"
    }),
    operationalStatus: Joi.string()
        .lowercase()
        .valid(...OPERATIONAL_STATUSES).$.messages({
            "string.base": "Operational status must be a text value",
            "any.only": "Invalid operational status code",
            "string.empty": "Operational status cannot be empty"
        }),
})