import BaseController from "./BaseController.js";
import ShopModel from "../models/ShopModel.js";
import mongoose from "mongoose";
import ShopService from "../services/ShopService.js";
import logger from "../utils/logger.js";
import { createShopSchema, updateShopSchema } from "../validators/ShopValidators.js";
import policyEngine from "../policies/policyEngine.js";
import { responseMapper } from "../handlers/responseMapper.js";
class ShopController extends BaseController {


    static buildModel = (data, model) => {
        console.log(data)
    }

    static buildQuery = (data) => {
        let query = {}

        if (data.city) {
            query['location.city'] = data.city
        }

        //for single document fetch
        if (data.keyword) {

            if (mongoose.Types.ObjectId.isValid(data.keyword)) {
                // filters = { _id: keyword }
                query._id = data.keyword
            } else {
                // filters = { getNumber: keyword }
                query['gstBill.number'] = data.keyword
            }
        }
        if(data.status){
            query.status=data.status
        }

        return query
    }

    //EXPORT METHODS=========================
    static getShops = async (req, res) => {

        try {
            const user = req.user;
            logger.info(`USER: ${user._id} accessing shop:getShops as ${user.role}`)

            //extract necessary query from user first
            const { limit = 10, page = 1 } = req.query

            //can build extra query from user side
            let userQuery = this.buildQuery(req.query);

            const skip = (page - 1) * limit
            let options = {
                skip,
                limit,
                page
            }


            // get policies
            const { query = {}, projection = "" } = policyEngine("shop", user, "getShops")


            //hit service
            const shops = await ShopService.search(ShopModel,
                { ...query, ...userQuery },
                {
                    ...options,
                    select: projection,
                })

            return this.handleResponse(res, 200, "Shop found", shops || [])
        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, { message: "Internal server error" })
        }

    }

    static getSingleShop = async (req, res) => {

        try {
            const user = req.user;
            logger.info(`USER: ${user._id} accessing shop:getSingleShop as ${user.role}`)

            //1:extract user query/params
            let userQuery = this.buildQuery(req.params)

            let options = {};

            //3: get query for user from policy
            let { query = {}, populate = [] } = policyEngine("shop", user, "getSingleShop")


            //4: search for shop with filter and keyword
            const shop = await ShopService.get(ShopModel, { ...query, ...userQuery }, { ...options, populate, lean: true })

            if (!shop) {
                return this.handleError(res, 404, { message: "Shop not found" })
            }

            //5: get projection fields
            const { projection = "" } = policyEngine("shop", user, "getSingleShop", shop);

            //6: map response acc. to user/projection
            const result=responseMapper(projection,shop)

            return this.handleResponse(res, 200, "Shop found", result)

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, { message: "Internal server error" })
        }
    }

    static createShop = async (req, res) => {
        try {
            const user = req.user
            logger.info(`USER: ${user._id} accessing shop:updateShop as ${user.role}`)

            const { error, value } = createShopSchema.validate(req.body);

            // check for req.body validation
            if (error) {
                return this.handleError(res, 400, { message: error.message });
            }

            //check for incoming image files
            if (!req?.file) {
                return this.handleError(res, 400, { message: "Invalid GST bill" });
            }

            // find existing shop
            const shop = await ShopService.search(ShopModel, { gstNumber: value.gstNumber })
            if (shop?.length > 0) {
                //if shop exisits just return
                return this.handleError(res, 400, { message: "Shop already exists with this gst number" })
            }

            //create if shop dosent exists
            const finalData = {
                ...value,
                owner: req.user._id,
            }

            // console.log(finalData);
            const result = await ShopService.create(ShopModel, finalData);

            return this.handleResponse(res, 201, "Shop created, and will be listed after approval", result)

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, { message: "Internal server error" })
        }

    }

    static updateShop = async (req, res) => {
        try {

            const { shopId } = req.params;
            const user = req.user;

            logger.info(`USER: ${user._id} accessing shop:updateShop as ${user.role}`)

            //1: basic validation
            const { value, error } = updateShopSchema.validate(req.body);

            if (error) {
                return this.handleError(res, 400, { message: `Validation error:-${error.message}` })
            }

            //2:check shop id
            if (!shopId || !mongoose.Types.ObjectId.isValid(shopId)) {
                return this.handleError(res, 400, { message: "Invalid shop id" })
            }

            //3:get if any data after validation
            this.buildModel(data, model)
            let data = value;


            //4: return error if empty payload or file
            if (!Object.keys(data).length && !req?.file) {
                return this.handleError(res, 400, { message: "Invalid payload" })
            }


            //5:get query for user
            const { query, projection } = policyEngine("shop", user, "updateShop");

            //6: get shop with above query only
            const shop = await ShopService.search(ShopModel, { ...query, _id: shopId }, { select: projection })
            if (!shop) {
                return this.handleError(res, 400, "Shop not found")
            }

            const { allowedFields } = policyEngine("shop", user, "updateShop", shop)
            if (!allowedFields || allowedFields.length === 0) {
                return this.handleError(res, 400, { message: "Cannot update any field in current resource" })
            }

            //#if there is any field which is not allowed for updation reject whole update
            const invalidFields = Object.keys(data).filter(field => !allowedFields.includes(field))
            if (invalidFields.length > 0) {
                return this.handleError(res, 400, { message: `Unauthorized field updation:- ${invalidFields.join(",")}` })
            }

            // 7: update all allowed field in resource
            logger.info(`Updating shop ${shopId} with payload ${JSON.stringify(data)}`)
            let changes = []
            Object.keys(data).forEach((field) => {
                if (allowedFields.includes(field) && data[field]) {
                    shop[field] = data[field]
                    changes.push(`${field}`)
                    return
                }
            })

            await shop.save()
            return this.handleResponse(res, 200, `Shop updation ${changes.length > 0 ? `successfull with following fields:${changes.join(",")}` : "done without any changes"}` )
        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, { message: "Internal server error" })
        }

    }

}

export default ShopController