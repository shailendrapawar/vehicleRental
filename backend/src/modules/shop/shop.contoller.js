import BaseController from "../base/base.controller.js"
import ShopModel from "./shop.model.js"
import mongoose from "mongoose";
import ShopService from "./shop.service.js"
import logger from "../../utils/logger.js";
import { createShopSchema, updateShopSchema } from "./shop.validator.js"
import policyEngine from "../../policies/policyEngine.js"
import { responseMapper } from "../../handlers/responseMapper.js"
import { buildPagination } from "../../helpers/requestHelper.js"
import contextBuilder from "../../utils/contextBuilder.js"
class ShopController extends BaseController {

    static MODULE = "SHOP";

    static get = async (req, res) => {
        try {
            let context = contextBuilder(req)
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:get module as ${context?.user?.role}`)

            if (!ShopService.get) {
                throw new Error("Method not supported");
            }

            const shop = await ShopService.get(req.params.id, context);

            if (!shop) {
                return this.handleResponse(res, 404, `No shop found with ${req?.params?.id}.`)
            }


            //handle with response mapper
            return this.handleResponse(res, 200, "Shop found", shop)
        } catch (error) {
            console.log(error)
            return this.handleError(res, 500, error)
        }
    }

    static search = async (req, res) => {
        try {
            const context = contextBuilder(req);
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:search module as ${context?.user?.role}`)

            if (!ShopService.search) {
                throw new Error("Method not supported");
            }

            let options = {};
            options.pagination = buildPagination(req)

            const data = await ShopService.search(req.query, context, options)

            return this.handleResponse(res, 200, "Shops found", data);

        } catch (error) {
            return this.handleError(res, 500, error)

        }
    }

}

export default ShopController