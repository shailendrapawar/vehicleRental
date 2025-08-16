import Joi from  "joi"
// import mongoose, { model } from "mongoose"

export const addVehicleSchema=Joi.object({

    // ownersip info 
    shopId:Joi.string().pattern(/^[a-fA-F0-9]{24}$/).length(24).required(),
    //basic identification
    registrationNumber:Joi.string().required(),
    vehicleType:Joi.string().valid("bike","scooty","car").required(),

    //build info
    brand:Joi.string().required(),
    model:Joi.string().required(),
    year:Joi.string().pattern(/^\d{4}$/).required(),
    color:Joi.string().required(),

    
    //mechanical capacity
    fuelType:Joi.string().valid("petrol","diesel","electric","hybrid").required(),
    transmission:Joi.string().valid("manual","automatic").required(),
    seatingCapacity:Joi.number().valid(1,2,4,6,7).required(),
    mileage:Joi.number().min(5).max(100).required()
})