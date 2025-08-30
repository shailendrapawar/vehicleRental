import mongoose, { Mongoose } from "mongoose";
import VehicleModel from "../../models/VehicleModel.js";
import { updateVehicleStatusSchema } from "../../validations/admin/vehicleValidations.js"

class AdminVehicleController {

    // #=====standard response============
    static standardResponse = async (res, status, msg, data = null) => {
        return res.status(status).json({
            msg,
            data
        })
    }

    static getVehicles = async (req, res) => {
        try {

            const { limit = 1 } = req.query;
            const { page = 1 } = req.query;
            const skip = (limit * page) - 1;

            const vehicles = await VehicleModel.find({}).select("brand model images status vehicleType").populate([
                {
                    path: "shopId",
                    select: "name"
                },
            ]).lean()

            return this.standardResponse(res, 200, "Vehicles found", {
                vehicles,
                hasMore: true
            })

        } catch (error) {

            console.log("error in get all vehicles")
            return this.standardResponse(res, 500, "Internal server error")
        }
    }

    static getSingleVehicle = async (req, res) => {
        try {
            const { vehicleId } = req.params;

            if (!vehicleId || !mongoose.Types.ObjectId.isValid(vehicleId)) {
                return this.standardResponse(res, 404, "Invalid vehicle id")
            }

            const vehicle = await VehicleModel.findById(vehicleId).populate([
                {
                    path: "shopId",
                    select: "name"
                },
                {
                    path: "owner",
                    select: "name profilePicture"
                }
            ]).lean()
            
            return this.standardResponse(res, 200, "Vehicles found", {
                vehicle
            })

        } catch (error) {
            console.log("error in get single vehicle")
            return this.standardResponse(res, 500, "Internal server error")
        }

    }

    static updateVehicle = async (req, res) => {

        try {
            const { vehicleId } = req.params;

            if (!vehicleId || !mongoose.Types.ObjectId.isValid(vehicleId)) {
                return this.standardResponse(res, 404, "Invalid vehicle id")
            }

            // 1: basic validation error
            const { value, error } = updateVehicleStatusSchema.validate(req.body || {});
            if (error) {
                return this.standardResponse(res, 400, `Validation error :- ${error.message}`)
            }

            // 2: find vehicle if exists and update
            const vehicle = await VehicleModel.findById(vehicleId)
            if (!vehicle) {
                return this.standardResponse(res, 404, 'Vehicle not found')
            }

            // 3: update status only if the status is different
            if (vehicle.status === value.status) {
                return this.standardResponse(res, 409, ` Already in ${value.status} status`)
            }

            vehicle.status = value.status;
            vehicle.statusMessage = value.statusMessage || ""

            vehicle.history.unshift({
                action:value.status,
                message:value.statusMessage,
                timestamps:new Date()
            })

            await vehicle.save();

            return this.standardResponse(res, 200, `Vehicle status updated to ${value.status}`);
        } catch (error) {
            console.log("error in updating vehicle status ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }



    }
}

export default AdminVehicleController;