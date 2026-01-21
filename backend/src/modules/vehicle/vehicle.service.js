import mongoose from "mongoose"

import VehicleModel from "./vehicle.model.js"
import AppError from "../../utils/app-error.js"

import { VEHICLE_STATUS_TRANSITION_MAP, TERMINAL_STATUSES } from "../../constants/vehicle.js"
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
    static VehicleTransitionMap = VEHICLE_STATUS_TRANSITION_MAP


    static set = async (model, entity, context) => {
        const log = context.logger;
        log.info(`processing ${Object.keys(model)?.length} fields, to update vehicle: ${entity._id}`)

        if (model.status) {
            if (!canTransition(entity.status, model.status, entity, this.VehicleTransitionMap)) {
                throw new AppError(`Entity's status cannot be changed from ${entity.status} to ${model.status}`)
            }
            entity.status = model.status
        }

        if (model.statusMessage) {
            entity.statusMessage = model.statusMessage
        }


        if (model.operationalStatus && !TERMINAL_STATUSES.includes(entity.status)) {
            entity.operationalStatus = model.operationalStatus
        }

        //for meta update
        if (model.meta) {
            entity.meta = entity.meta || {}
            Object.keys(model.meta).forEach((key, i) => {
                entity[key] = model[key]
            })
        }
        return entity
    }

    static get = async (id, context, options = {}) => {
        if (!id) return
        const log = context.logger;
        log.silly(`Inside GET service, with keyword:${id}`)

        let where = {}
        let entity = null

        if (typeof (id) == "string") {
            if (mongoose.Types.ObjectId.isValid(id)) {
                entity = await VehicleModel.findById(id.toLowerCase());
            } else {
                entity =await VehicleModel.findOne({ registrationNumber: id.toLowerCase() })
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

    static search = async (query, context, options = {}) => {
        const log = context.logger;

        let where = {};
        let sort = {
            timestamps: 1
        }
        let { limit, skip } = options.pagination;

        if (query.status) {
            where.status = query.status
        }
        if (query.vehicleType) {
            where.vehicleType = query.vehicleType
        }
        if (query.operationalStatus) {
            where.operationalStatus = query.operationalStatus
        }

        //3: run query
        log.silly(`Searching for resource with, where=>${where}`)
        const totalVehicles = VehicleModel.countDocuments(where);
        const vehicles = VehicleModel.find(where).sort(sort).skip(skip).limit(limit);

        const [total, items] = await Promise.all([totalVehicles, vehicles])

        log.info(`Found ${items.length} vehicles for query ${where?.toString()}`)
        return { total, items, count: items.length }
    }

    static create = async (model, context, options = {}) => {
        const log = context.logger;

        const vehicle = await this.get(model.registrationNumber, context, {});
        if (vehicle) {
            log.warn(`Vehicle already exists with this Registration: ${model.registrationNumber}, returning back...`)
            throw new AppError(`Vehicle already exists with Registration: ${model.registrationNumber}`, 400, "Bad Request");
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

    static update = async (id, model, context) => {
        if (!id) { return }
        const log = context.logger;
        log.silly(`Inside UPDATE service, with keyword:${id}`)

        let entity = await this.get(id, context, {});
        if (!entity) {
            log.warn(`No shop found with: ${id}, returning back`)
            throw new AppError("No Shop found", 404, "RESOURCE_NOT_FOUND")
        }


        entity = await this.set(model, entity, context);
        await entity.save();

        // TODO: run any events with rabbit mq eg(status update: notify owner)
        return entity
    }
}

export default VehicleService;