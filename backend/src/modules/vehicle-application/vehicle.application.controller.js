import mongoose from "mongoose";
import { createVehicleApplicationSchema, updateVehicleApplicationSchema } from "./vehicle.application.validator.js";
import logger from "../../utils/logger.js";

import ShopService from "../shop/shop.service.js";
import ShopModel from "../shop/shop.model.js";

import VehicleApplicationModel from "./vehicle.application.model.js";
import BaseController from "../base/base.controller.js";
import VehicleApplicationService from "./vehicle.application.service.js";

import policyEngine from "../../policies/policyEngine.js"
import { responseMapper } from "../../handlers/responseMapper.js";
import { updateMapper } from "../../handlers/updateMapper.js";

class VehicleApplicationController extends BaseController {

    //export methods===============

    static buildQuery(query) {
        let resultQuery = {}

        if (query.registrationNumber) {
            resultQuery['registrationNumber'] = query.registrationNumber
        }
        if (query.applicationId) {

            resultQuery['_id'] = new mongoose.Types.ObjectId(query.applicationId)
        }
        if (query.status) {
            resultQuery['status'] = query.status
        }
        return resultQuery;
    }

    // 1: get vehicle application
    static getVehicleApplication = async (req, res) => {
        try {
            const user = req.user;
            logger.info(`USER: ${user._id} accessing vehicle:getVehicleApplication as ${user.role.toUpperCase()}`)

            // build default query/params
            const defaultQuery = this.buildQuery(req.params);
            // get policy
            const { query = {}, populate = {} } = policyEngine("vehicleApplication", user, "getVehicleApplications")

            const vehicleApplication = await VehicleApplicationService.get(VehicleApplicationModel, { ...query, ...defaultQuery }, { populate, lean: true });

            if (!vehicleApplication) {
                return this.handleError(res, 404, { message: "Vehicle application not found" })
            }

            logger.success(`Vehicle application found: ${vehicleApplication._id} for user: ${user._id}`)
            return this.handleResponse(res, 200, "Application found", vehicleApplication)
        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, { message: `Internal server error` });
        }

    }

    // 2: search vehicle application
    static searchVehicleApplication = async (req, res) => {
        try {
            const user = req.user;
            logger.info(`USER: ${user._id} accessing vehicle:searchVehicleApplication as ${user.role.toUpperCase()}`)

            //build default query/params
            const defaultQuery = this.buildQuery(req.query);
            let options = {
                skip: parseInt(req.query.skip) || 0,
                limit: parseInt(req.query.limit) || 10,
            }

            //get policy
            let { query = {}, populate = {} } = policyEngine("vehicleApplication", user, "searchVehicleApplications")

            //merge queries and options
            query = { ...defaultQuery, ...query }
            options = { ...options, populate, lean: true, }

            logger.debug(`Final query for vehicle applications search: ${JSON.stringify(query)}, with options: ${JSON.stringify(options)}`)

            const vehicleApplications = await VehicleApplicationService.seach(VehicleApplicationModel, query, options);

            logger.success(`Vehicle applications found: ${vehicleApplications?.length || 0} for user: ${user._id}`)
            return this.handleResponse(res, 200, "Successfull query", vehicleApplications)
        } catch (error) {

            logger.error(error)
            return this.handleError(res, 400, { message: `Internal server error` });
        }
    }

    //3 : create vehicle application
    static createVehicleApplication = async (req, res) => {

        try {
            const user = req.user;
            logger.info(`USER: ${user._id} accessing vehicle:updateVehicle as ${user.role.toUpperCase()}`)
            const { error, value } = createVehicleApplicationSchema.validate(req.body);

            if (error) {
                return this.handleError(res, 400, { message: `Validation error : ${error.message}` });
            }

            const shopId = value.shopId;
            // 1: get shop and verify status==approved
            const shop = await ShopService.get(ShopModel, { _id: shopId, owner: user._id }, { lean: true })
            if (!shop || shop.status != "approved") {
                return this.handleError(res, 404, { message: "Shop not found or not active, please contact support" })
            }
            logger.silly(`Shop found: ${shop._id} owned by current user: ${shop.owner}`)

            // 2: get application basis on status: pending, approved, ownership etc
            const existingApplication = await VehicleApplicationService.get(VehicleApplicationModel, { registrationNumber: value.registrationNumber, owner: user._id, status: { $in: ["pending", "approved"] } }, { lean: true });

            if (existingApplication) {
                logger.warn(`Active application already exists for registration number: ${value.registrationNumber}, returning back`)
                return this.handleError(res, 409, { message: ` ${existingApplication.status} application already exists for this vehicle registration number` })
            }

            //3: create application
            const application = await VehicleApplicationService.create(VehicleApplicationModel, { ...value, userId: user._id, shopId: shopId });
            logger.success(`New vehicle application created with id: ${application._id}, by user: ${user._id}`)
            return this.handleResponse(res, 201, { message: "Vehicle application created successfully" })

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, { message: `internal server error` });
        }
    }

    // 1: update vehicle application
    static updateVehicleApplication = async (req, res) => {
        try {

            const user = req.user;
            logger.info(`USER: ${user._id} accessing vehicle:updateVehicleApplication as ${user.role.toUpperCase()}`)

            const { applicationId } = req.params;

            // 1: handle invalid applicationId &&  schema validation
            if (!applicationId || !mongoose.Types.ObjectId.isValid(applicationId)) {
                return this.handleError(res, 400, { message: "Invalid applicationId" });
            }
            const { error, value } = updateVehicleApplicationSchema.validate(req.body);
            if (error) {
                return this.handleError(res, 400, { message: `Validation error : ${error.message}` });
            }


            // 2: get query from policy engine and fetch application
            let { query } = policyEngine("vehicleApplication", user, "updateVehicleApplications")
            query = { ...query, _id: new mongoose.Types.ObjectId(applicationId) }

            logger.debug(`Final query for fetching vehicle application for update: ${JSON.stringify(query)}`)
            const application = await VehicleApplicationService.get(VehicleApplicationModel, query, { lean: false });
            if (!application) {
                return this.handleError(res, 404, { message: "Vehicle application not found or you don't have permission to update" })
            }

            // 3: get allowed fields from policy and map updates
            const { allowedFields } = policyEngine("vehicleApplication", user, "updateVehicleApplications")

            logger.silly(`Mapping allowed fields: ${allowedFields} , for application : ${application._id}`)
            const { isSucces, message, entity } = updateMapper(allowedFields, application, value);
            // 4: handle update mapper failure
            if (!isSucces) {
                return this.handleError(res, 400, { message: message });
            }

            await entity.save();
            return this.handleResponse(res, 200, "Vehicle application updated successfully")

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, { message: `internal server error` });
        }

    }

}

export default VehicleApplicationController;