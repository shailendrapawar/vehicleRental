import { addVehicleSchema } from "../../validations/owner/addVehicleSchema.js"

class VehicleController {

    static standardResponse = async (res, status, msg, data = null) => {
        return res.status(status).json({
            msg,
            data
        })
    }

    // A: adding vehicle to system for admin approve

    static addVehicle = async (req, res) => {
        try {
            const {error,value}=addVehicleSchema.validate(req.body)
            console.log(req.body)

            if(error){
            return this.standardResponse(res, 400, `Validation error:- ${error.message}`)     
            }
            console.log("body-data",value)
            console.log("fils",req.files)

        } catch (error) {
            console.log("error in login admin ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }
}

export default VehicleController