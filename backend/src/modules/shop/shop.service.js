import mongoose from "mongoose";
import BaseService from "../base/base.service.js";
import ShopModel from "./shop.model.js";
class ShopService extends BaseService {

    constructor() {
        this.model = ShopModel;
    }
    // // 1: create shop================
    // static create = async (model, data) => {
    //     const newShop = new model({
    //         name: data.name,
    //         owner: new mongoose.Types.ObjectId(data.owner),
    //         contact: {
    //             email: data.email
    //         },
    //         gstBill: {
    //             number: data.gstNumber
    //         },
    //         location: {
    //             address: data.address,
    //             city: data.city,
    //             state: data.state,
    //             pincode: data.pincode,
    //             coords: {
    //                 latitude: data.lat,
    //                 longitude: data.lng
    //             }
    //         }
    //     })
    //     return await newShop.save()
    // }

    // // 2: get shops
    // static search = async (model, filters = {}, options = {}) => {
    //     const result = await model.find(filters)
    //         .select(options.select || "")
    //         .populate(options.populate)
    //         .limit(options.limit || 0)
    //         .skip(options.skip || 0).lean()

    //     return result || [];
    // }


    // // 2: search
    // static get = async (model, filters = {}, options = {}) => {

    //     let result;
    //     // console.log("optoins",options)
    //     let query = model.findOne(filters)
    //         .populate(options.populate)
    //         .select(options.select || "")

    //     if (options.lean) {
    //         query = query.lean()
    //     }

    //     result = await query

    //     return result
    // }

    // static update = async (model, data) => {



    // }


    static get = async (query, context, options) => {
        if (!query) { return }
        const log = context.logger;

        let where = {}
        let entity = null

        if (typeof (query) === "string") {
            log.silly(`Getting shop with: ${query} `)
            if (mongoose.Types.ObjectId.isValid(query)) {
                entity = ShopModel.findById(query);
            } else {
                entity = ShopModel.findOne({ gstNumber: query });
            }
        }
        return entity
    }
}

export default ShopService