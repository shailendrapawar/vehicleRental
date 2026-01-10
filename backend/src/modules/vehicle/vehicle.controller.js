import BaseController from "../base/base.controller.js"
import logger from "../../utils/logger.js";
import contextBuilder from "../../utils/contextBuilder.js"
import mongoose from "mongoose";

import ShopService from "../shop/shop.service.js";
import { createVehicleSchema } from "./vehicle.validator.js";
import VehicleService from "./vehicle.service.js";
class VehicleController extends BaseController {

    static MODULE = "VEHICLE";

    static get = (req, res) => {
        try {
            let context = contextBuilder(req)
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:get module as ${context?.user?.role}`)

            const data = VehicleService.get(req.params.id, context)

            if (!data) {
                return this.handleError(res, 400, { message: "Vehicle not created" });
            }
            return this.handleResponse(res, 201, "Get request sucessfull", data)

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }

    static search = (req, res) => {
        try {
            let context = contextBuilder(req)
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:search module as ${context?.user?.role}`)

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }

    static create = async (req, res) => {
        try {
            let context = contextBuilder(req)
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:create module as ${context?.user?.role}`)

            const { error, value } = createVehicleSchema.validate(req.body);
            if (error) {
                log.error(error)
                return this.handleError(res, 400, error)
            }

            const data = await VehicleService.create(value, context);
            if (!data) {
                return this.handleError(res, 400, { message: "Vehicle not created" });
            }

            return this.handleResponse(res, 201, "Vehicle created sucessfully")

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }
    static update = (req, res) => {
        try {
            let context = contextBuilder(req)
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:update module as ${context?.user?.role}`)

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }

}

export default VehicleController;
