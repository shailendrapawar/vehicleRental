import mongoose from "mongoose"

import VehicleModel from "./vehicle.model.js"
import AppError from "../../utils/app-error.js"
class VehicleService {

    static populate = [
        {
            path: "owner",
            select: "name email _id profilePicture"
        },
        {
            path: "shop",
            select: "name location"
        }
    ]


    static get = async (id, context, options = {}) => {
        if (!id) return
        const log = context.logger;
        log.silly(`Inside GET service, with keyword:${id}`)

        let where = {}
        let entity = null

        if (typeof (id) == "string") {
            if (mongoose.Types.ObjectId.isValid(id)) {
                entity = VehicleModel.findById(id.toLowerCase());
            } else {
                entity = VehicleModel.findOne({ registrationNumber: id.toLowerCase() })
            }
        }

        if (entity) {
            if (options.populate) {
                entity = entity.populate(this.populate)
            }
            if (options.lean) {
                entity = entity.lean()
            }
        }

        entity = await entity
        return entity;
    }

    static create = async (model, context, options = {}) => {
        const log = context.logger;

        const vehicle = await this.get(model.registrationNumber, context, {});
        if (vehicle) {
            log.warn(`Vehicle already exists with this Registration: ${model.registrationNumber}, returning back...`)
            throw new AppError(`Vehicle already exists with Registration: ${id}`, 400, "Bad Request");
        }

        const entity = new VehicleModel({
            owner: new mongoose.Types.ObjectId(context?.user?._id),
            shop: new mongoose.Types.ObjectId(model.shopId),
            registrationNumber: model.registrationNumber.toLowerCase(),
            vehicleType: model.vehicleType,
            brand: model.brand,
            model: model.model,
            year: model.year,
            color: model.color,

            fuelType: model.fuelType,
            transmission: model.transmission,
            seatingCapacity: model.seatingCapacity,
            mileage: model.mileage,
        })

        await entity.save()

        return entity;
    }

}

export default VehicleService;