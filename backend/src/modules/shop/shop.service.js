import mongoose from "mongoose";
import BaseService from "../base/base.service.js";
import ShopModel from "./shop.model.js";
import AppError from "../../utils/app-error.js"
import { SHOP_STATUS_TRANSITION_MAP, TERMINAL_STATUSES } from "../../constants/shop.js"
import { canTransition } from "../../utils/statusTransition.js";

class ShopService extends BaseService {

    // static ENTITY = ShopModel;
    static populate = [
        {
            path: "owner"
        }
    ]
    static ShopTransitionMap = SHOP_STATUS_TRANSITION_MAP

    static set = (model, entity, context) => {
        const log = context.logger;
        log.info(`processing ${Object.keys(model)?.length} fields, to update shop: ${entity._id}`)

        if (model.name) {
            entity.name = model.name
        }

        if (model.status) {
            if (!canTransition(entity.status, model.status, entity, this.ShopTransitionMap)) {
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

        if (model.address) {
            entity.location = {
                ...entity.location,
                address: model.address
            }
        }

        if (model.pinCode) {
            entity.location = {
                ...entity.location,
                pincode: model.pinCode
            }
        }

        if (model.state) {
            entity.location = {
                ...entity.location,
                state: model.state
            }
        }

        if (model.lat) {
            entity.coords = {
                ...entity.coords,
                latitude: lat
            }
        }

        if (model.lon) {
            entity.coords = {
                ...entity.coords,
                longitude: lon
            }
        }
        //for meta update
        if (model.meta) {
            entity.meta = entity.meta || {}
            Object.keys(model.meta).forEach((key, i) => {
                entity[key] = model[key]
            })
        }
        return entity;
    }

    static get = async (id, context, options = {}) => {
        if (!id) { return }
        const log = context.logger;

        let where = {}
        let entity = null

        if (typeof (id) === "string") {
            log.silly(`Getting shop with: ${id}`)
            if (mongoose.Types.ObjectId.isValid(id)) {
                entity = ShopModel.findById(id);
            } else {
                entity = ShopModel.findOne({ "gstBill.number": id?.toUpperCase() });
            }
        }

        if (entity) {

            if (options.populate) {
                entity = entity.populate(this.populate)
            }
            if (options.lean) {
                entity = entity.lean();
            }
            entity = await entity
        }
        return entity
    }

    static search = async (query, context, options = {}) => {
        const log = context.logger;

        let where = {};
        let sort = {
            timestamps: 1
        }
        let { limit, skip } = options.pagination;

        // 1: acc to city for admin and customer
        if (query.city) {
            where.city = query.city
        }
        //2: acc to status for, admin and owner
        if (query.status) {
            where.status = query.status
        }

        //3: run query
        const totalShops = ShopModel.countDocuments(where);
        const shops = ShopModel.find(where).sort(sort).skip(skip).limit(limit);

        const [total, items] = await Promise.all([totalShops, shops])

        log.info(`Found ${items.length} shops for query ${where?.toString()}`)
        return { total, items, count: items.length }
    }

    static create = async (model, context, options = {}) => {
        const log = context.logger;
        // 1: find shop with incoming GST
        const shop = await this.get(model.gstNumber, context)
        if (shop) {
            log.warn(`Shop Already exists with GST: ${model.gstNumber}, returning back...`)
            throw new AppError("Shop Already exists with this GST", 400, "Bad Request");
        }

        const entity = new ShopModel({
            name: model.name,
            owner: new mongoose.Types.ObjectId(context.user?._id),
            contact: {
                email: context?.user?.email
            },
            gstBill: {
                number: model.gstNumber
            },
            location: {
                address: model.address,
                city: model.city,
                state: model.state,
                pincode: model.pinCode,
                coords: { latitude: model.lat, longitude: model.lon }
            }
        })

        await entity.save()
        //TODO: from here hit an event with rabbitmq for admin or owner email
        return entity;
    }

    static update = async (id, model = {}, context) => {
        if (!id) { return }
        const log = context.logger;

        let entity = await this.get(id, context, {});
        if (!entity) {
            log.warn(`No shop found with: ${id}, returning back`)
            throw new AppError("No Shop found", 404, "RESOURCE_NOT_FOUND")
        }

        entity = await this.set(model, entity, context);
        await entity.save();


        // TODO: run any events with rabbit mq 

        return entity
    }
}

export default ShopService