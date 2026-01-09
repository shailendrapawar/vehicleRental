import mongoose from "mongoose";
import BaseService from "../base/base.service.js";
import ShopModel from "./shop.model.js";
class ShopService extends BaseService {

    static model = ShopModel;
    static populate = [
        {
            path: "owner"
        }
    ]

    static get = async (query, context, options = {}) => {
        if (!query) { return }
        const log = context.logger;

        let where = {}
        let entity = null

        if (typeof (query) === "string") {
            log.silly(`Getting shop with: ${query}`)
            if (mongoose.Types.ObjectId.isValid(query)) {
                entity = ShopModel.findById(query);
            } else {
                entity = ShopModel.findOne({ gstNumber: query });
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

        log.info(`Shop found with query ${query}`)
        return entity
    }

    static search = async (query, context, options) => {
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
}

export default ShopService