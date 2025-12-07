import mongoose, { mongo } from "mongoose";
import BaseService from "./BaseService.js";
import ShopModel from "../models/ShopModel.js";
class ShopService extends BaseService {

    // 1: create shop================
    static create = async (model, data) => {
        const newShop = new model({
            name: data.name,
            owner: new mongoose.Types.ObjectId(data.owner),
            contact: {
                email: data.email
            },
            gstBill: {
                number: data.gstNumber
            },
            location: {
                address: data.address,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
                coords: {
                    latitude: data.lat,
                    longitude: data.lng
                }
            }
        })
        return await newShop.save()
    }

    // 2: get shops
    static get=async(model,filters={},options={})=>{

        const result=await model.find(filters)
        .select(options.select||"")
        .populate(options.populate)
        .limit(options.limit||0)
        .skip(options.skip||0).lean()

        return result[0]||null;
    }


    // 2: search
    static search = async (model, filters={},options={}) => {

        let result;
        // console.log("optoins",options)
        let query =  model.findOne(filters)
        .populate(options.populate)
        .select(options.select||"")

        if(options.lean){
            query = query.lean()
        }

        result=await query

        return result
    }

    static update=async(model,data)=>{



    }
}

export default ShopService