import mongoose from "mongoose"

class VehicleService {
    static create = async (model, data) => {
        const newVehicle = new model({
            registrationNumber: data.registrationNumber,
            vehicleType: data.vehicleType,
            brand: data.brand,
            model: data.model,
            year: data.year,
            color: data.color,
            fuelType: data.fuelType,
            transmission: data.transmission,
            seatingCapacity: data.seatingCapacity,
            mileage: data.mileage,
            owner: data?.user?._id,
            shop: data?.shop?._id
        });
        return newVehicle.save();
    }


    static get = async (model, filters = {}, options = {}) => {
        let result;
        const query = model.findOne(filters)
            .populate(options.populate)
            .select(options.select || "")

        if (options.lean) {
            query.lean();
        }

        result = await query;
        return result;
    }

    static search = async (model, filters = {}, options = {}) => {

        console.log("filters", filters)
        console.log("options", options)
        let result;
        const query = model.find(filters)
            .select(options.select || "")
            .skip(options.skip || 0)
            .limit(options.limit || 10)
            .populate(options.populate);
        if (options.lean) {
            query.lean();
        }

        result = await query;
        return result;
    }


}

export default VehicleService;