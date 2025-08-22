import VehicleModel from "../../models/VehicleModel";
import { updateVehicleStatusSchema } from "../../validations/admin/vehicleValidations"

class AdminVehicleController {

    // #=====standard response============
    static standardResponse = async (res, status, msg, data = null) => {
        return res.status(status).json({
            msg,
            data
        })
    }

    static updateVehicleStatus = async (req, res) => {

        try {
            // 1: basic validation error
            const { value, error } = updateVehicleStatusSchema(req.body);
            if (error) {
                return this.standardResponse(res, 400, `Validation error :- ${error.message}`)
            }

            // 2: find vheicle if exists and update
            const vehicle = await VehicleModel.findById(value._id)
            if (!vehicle) {
                return this.standardResponse(res, 400, 'Vehicle not found')
            }

            // 3: update status only if the status is different
            if (vehicle.status === value.status) {
                return this.standardResponse(res, 409, ` Already in ${value.status} status`)
            }

            vehicle.status = value.status;
            vehicle.statusMessage = value.statusMessage || ""

            await vehicle.save();

            return this.standardResponse(res, 200, `Vehicle status updated to ${value.status}`);
        } catch (error) {
            console.log("error in updating vehicle status ")
            return this.standardResponse(res, 500, "Internal server error")
        }



    }
}

export default AdminVehicleController;