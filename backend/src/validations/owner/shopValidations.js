import Joi from "joi"

export const createShopSchema = Joi.object({

    name: Joi.string().required(),

    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pinCode:Joi.string().length(6).required(),

    lat: Joi.number().required(),
    lng: Joi.number().required(),


    phoneNumber: Joi.string().required(),
    gstNumber: Joi.string().length(15).required(),

})