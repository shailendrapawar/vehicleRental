import mongoose from "mongoose";
import BaseService from "../base/base.service.js";
import ShopModel from "../shop/shop.model.js";

class VehicleApplicationService extends BaseService {

    // Method to get active vehicle application by registration number  

    static create = async (model, data) => {
        const newVehicleApplication = new model({

            owner: new mongoose.Types.ObjectId(data.userId),
            shop: new mongoose.Types.ObjectId(data.shopId),

            registrationNumber: data.registrationNumber,
            vehicleType: data.vehicleType,
            brand: data.brand,
            model: data.model,

            fuelType: data.fuelType,
            transmission: data.transmission,
            seatingCapacity: data.seatingCapacity,
            mileage: data.mileage,
        });

        return newVehicleApplication.save();
    }

    static get = async (model, filters = {}, options = {}) => {

        let query = model.findOne({ ...filters })
            .populate(options.populate || [])
            .select(options.select || "")

        if (options.lean) {
            query = query.lean()
        }
        const result = await query;
        return Array.isArray(result) ? result[0] : result;
    }

    static search = async (model, filters = {}, options = {}) => {
        let query = model.find({ ...filters })
            .populate(options.populate || [])
            .select(options.select || "")
            .skip(options.skip || 0)
            .limit(options.limit || 10)

        if (options.lean) {
            query = query.lean()
        }
        const result = await query || [];
        return result;
    }

    static update = async (model, filters = {}, options = {}) => { }

}
export default VehicleApplicationService