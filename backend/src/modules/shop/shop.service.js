import mongoose from "mongoose";
import BaseService from "../base/base.service.js";
import ShopModel from "./shop.model.js";
import AppError from "../../utils/app-error.js"
class ShopService extends BaseService {

    // static ENTITY = ShopModel;
    static populate = [
        {
            path: "owner"
        }
    ]

    static set = (model, entity) => {

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
                number: model.name
            },
        })

        await entity.save()
        //TODO: from here hit an event with rabbitmq for admin or owner email
        return entity;
    }
}

export default ShopService