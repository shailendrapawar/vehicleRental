import BaseController from "../base/base.controller.js"
import logger from "../../utils/logger.js";

import { createVehicleSchema, updateVehicleSchema } from "./vehicle.validator.js";
import ShopService from "../shop/shop.service.js";
import ShopModel from "../shop/shop.model.js";
import mongoose from "mongoose";

import policyEngine from "../../policies/policyEngine.js";

import VehicleService from "./vehicle.service.js";
import VehicleModel from "./vehicle.model.js";

import { responseMapper } from "../../handlers/responseMapper.js";
import { updateMapper } from "../../handlers/updateMapper.js";

class VehicleController extends BaseController {
    static buildQuery = (params) => {

        const query = {};

        if (params.shop) {
            query.shop = new mongoose.Types.ObjectId(params.shop)
        }

        return query;
    };

    //EXPORT METHODS=====================

    // A: get single vehicle with _id or registrationNumber
    static getVehicle = async (req, res) => {

        try {
            const user = req.user
            logger.info(`USER: ${user._id} accessing vehicle:getVehicle as ${user.role}`)

            const { keyword } = req.params;
            // console.log(keyword)
            let userFilters = {};
            let userOptions = {
                lean: true
            };

            // 1 check type of keyword object id or registration number
            if (mongoose.Types.ObjectId.isValid(keyword)) {
                userFilters._id = keyword;
            } else {
                userFilters.registrationNumber = keyword;
            }

            // 2 get policies for particular user and resource
            const { query, populate } = policyEngine("vehicle", user, "getVehicle")

            // 3: get vehicle with that policies
            const vehicle = await VehicleService.get(VehicleModel, { ...query, ...userFilters }, { populate: populate, ...userOptions })
            if (!vehicle) {
                return this.handleError(res, 404, { message: "Vehicle not found" })
            }

            // 4: get projections for vehicle
            const { projection } = policyEngine("vehicle", user, "getVehicle", vehicle)
            if (projection == null || "") {
                return this.handleError(res, 404, { message: "Vehicle not found" })
            }

            //5: map response acc. to user/projection
            const result = responseMapper(projection, vehicle);

            return this.handleResponse(res, 200, "Vehicle found", result)
        } catch (error) {
            logger.error(error);
            return this.handleError(res, 500, { message: "Internal server error" });
        }
    };

    static searchVehicles = async (req, res) => {

        try {
            const user = req.user;
            logger.info(`USER: ${user._id} accessing vehicle:searchVehicles as ${user.role}`)
            const userFilters = this.buildQuery(req.query || {})
            //build query based on user filters 
            const userOptions = {
                lean: true,
                page: req.query.page || 1,
                limit: req.query.limit || 10,
                skip: ((req.query.page || 1) - 1) * (req.query.limit || 10)
            };
            // 1: get policies for particular user and resource
            const { query, populate, projection } = policyEngine("vehicle", user, "searchVehicles");

            // 2: get vehicles with that policies   
            const vehicles = await VehicleService.search(VehicleModel, { ...query, ...userFilters }, { populate: populate, ...userOptions });
            if (vehicles?.length == 0) {
                return this.handleResponse(res, 404, "No vehicles found", [])
            }
            
            //3: map response acc. to user/projection
            const result = responseMapper(projection, vehicles);

            return this.handleResponse(res, 200, "Vehicles found", result || []);

        } catch (error) {
            logger.error(error);
            return this.handleError(res, 500, { message: "Internal server error" });
        }

    };

    static createVehicle = async (req, res) => {
        try {
            const user = req.user;
            // basic input validation
            const { error, value } = createVehicleSchema.validate(req.body);
            if (error) {
                return this.handleError(res, 400, {
                    message: `Validation error:- ${error.message}`,
                });
            }



            // 1:get policies
            const { query } = policyEngine("shop", user, "getSingleShop");


            // 2: get shop with shopId and current user as owner
            const shop = await ShopService.search(ShopModel, { ...query, _id: new mongoose.Types.ObjectId(value.shopId) }, { lean: true, select: "status statusMessage " }
            );


            //3: return if shop banned
            if (shop.status === "banned") {
                return this.handleError(res, 400, {
                    message: `Shop is banned due to:- ${shop.statusMessage || "discrepency or report"
                        }.Contact admin for re-approval`,
                });
            }



            //4: check if any vehicle exists with incoming registration number
            const vehicle = await VehicleService.get(VehicleModel,
                { registrationNumber: value.registrationNumber, status: 'approved' },
                { lean: true })

            //5: return if any exisitng vehicle exists with incoming registration number
            if (vehicle && vehicle.status === "approved") {
                return this.handleError(res, 400, { message: `Vehicle already exists with registration number: ${value.registrationNumber}` })
            }

            //5: (TODO) upload vehicles images incloudinary
            const result = await VehicleService.create(VehicleModel, {
                ...value,
                shop,
                user,
            });

            return this.handleResponse(res, 200, "Vehicle added, will be listed after approval",);
        } catch (error) {
            logger.error(error);
            return this.handleError(res, 500, { message: "Internal server error" });
        }
    };

    static updateVehicle = async (req, res) => {
        try {
            const user = req.user;
            const vehicleId = req.params.vehicleId;

            logger.info(`USER: ${user._id} accessing vehicle:updateVehicle as ${user.role.toUpperCase()}`)

            // 1: validate input
            const { error, value } = updateVehicleSchema.validate(req.body);
            if (error) {
                return this.handleError(res, 400, { message: ` Validation error:- ${error.message}` });
            }

            //1: get vehicle if it exists and user is owner according to policies
            const { query, populate } = policyEngine("vehicle", user, "updateVehicle");
            const vehicle = await VehicleService.get(VehicleModel, { _id: vehicleId, ...query }, { lean: false, populate: populate });
            if (!vehicle) {
                return this.handleError(res, 404, { message: "Vehicle not found" });
            }

            // 2: check if vehicle is banned so reject update for non admin users 
            if (vehicle.status === 'banned' && user.role !== 'admin') {
                return this.handleError(res, 400, { message: `Vehicle is banned due to:- ${vehicle.statusMessage || "discrepency or report"} .Contact admin for re-approval` });
            }

            // 3: get allowed fields from policies
            const { allowedFields } = policyEngine("vehicle", user, "updateVehicle", vehicle);

            if (allowedFields.length === 0) {
                return this.handleError(res, 403, { message: "You are not allowed to update this vehicle" });
            }

            //4: map incoming allowed values from model into enitity
            const { isSucces, message, entity } = updateMapper(allowedFields, vehicle, value);
            if (!isSucces) {
                logger.error(message);
                return this.handleError(res, 400, { message: message });
            }
            //5: update vehicle
            await entity.save();

            return this.handleResponse(res, 200, "Vehicle updated", entity);
        } catch (error) {
            logger.error(error);
            return this.handleError(res, 500, { message: "Internal server error" });
        }
    };
}

export default VehicleController;
