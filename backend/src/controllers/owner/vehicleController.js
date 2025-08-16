import mongoose, { Mongoose } from "mongoose"
import VehicleModel from "../../models/VehicleModel.js"
import uploadToCloudinary from "../../services/uploadToCloudinary.js"
import { addVehicleSchema } from "../../validations/owner/vehicleValidations.js"
import fs from "fs"
import ShopModel from "../../models/ShopModel.js"

class VehicleController {

    static standardResponse = async (res, status, msg, data = null) => {
        return res.status(status).json({ msg, data })
    }

    // A: adding vehicle to system for admin approve

    static addVehicle = async (req, res) => {
        try {
            const { error, value } = addVehicleSchema.validate(req.body);

            // 1: validation error
            if (error) {
                return this.standardResponse(res, 400, `Validation error:- ${error.message}`)
            }

            // 2: check for files length
            if (req.files.length < 3) {
                return this.standardResponse(res, 400, `Minimum 3 files are required for upload`)
            }
            if (req.files.length > 5) {
                return this.standardResponse(res, 400, `Only 5 files are allowed for upload`)
            }

            // 3:=====check for existing vehicle with same registration============
            const { shopId, vehicleType, registrationNumber, brand, model, year, color, fuelType, transmission, seatingCapacity, mileage } = value
            const isExists = await VehicleModel.findOne({ registrationNumber: registrationNumber })
            if (isExists) {
                // delete temp uploaded images if exists i server
                for (const file of req.files) {
                    await fs.unlinkSync(file.path)
                }
                return this.standardResponse(res, 400, "This vehicle is already registered")
            }


            // 4: check if store's owner is the one requesting
            const shop = await ShopModel.findById(shopId);

            if (!shop) {
                return this.standardResponse(res, 400, "Shop not found")
            }
            if (shop.owner.toString() !== req.user._id) {
                return this.standardResponse(res, 400, "Not authroized to add vehicle to shop")
            }


            // 5: upload Images in cloudinary and store url,id
            // const uploadedImages = [];

            // for (const file of req.files) {
            //     const data = await uploadToCloudinary(file.path)
            //     uploadedImages.push(data)
            // }

            const uploadedImages = await Promise.all(
                req.files.map(file => uploadToCloudinary(file.path))
            );


            // 6: Create/ add vehicle to that shop
            const newVehicle = new VehicleModel({
                owner: new mongoose.Types.ObjectId(req.user._id),
                shopId,
                vehicleType,
                registrationNumber,
                brand,
                model,
                year,
                color,
                fuelType,
                transmission,
                seatingCapacity,
                mileage,
                images: uploadedImages
            })

            await newVehicle.save();
            return this.standardResponse(res, 200, "Vehicle Uploaded and will be listed after approaval")

        } catch (error) {
            console.log("error in add vehicle ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }
}

export default VehicleController