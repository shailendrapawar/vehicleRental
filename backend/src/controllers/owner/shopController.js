import mongoose from "mongoose";
import ShopModel from "../../models/ShopModel.js";
import uploadToCloudinary from "../../services/uploadToCloudinary.js";
import { createShopSchema } from "../../validations/owner/shopValidations.js"

class ShopController {

    static standardResponse = async (res, status, msg, data = null) => {
        return res.status(status).json({
            msg,
            data
        })
    }



    // 1: create shop
    static createShop = async (req, res) => {

        try {
            // 1: initial validation
            const { error, value } = createShopSchema.validate(req.body);
            if (error) {
                return this.standardResponse(res, 400, `Validation error:- ${error.message}`)
            }

            // 2: check for GST image
            if (!req.file) {
                return this.standardResponse(res, 400, `GST bill image is required`)
            }

            const { name, address, city, state, pinCode, lat, lng, phoneNumber, gstNumber } = value


            // 3: find if any shop exists with same gst
            const isExists = await ShopModel.findOne({ "gst.number": gstNumber })
            if (isExists) {
                return this.standardResponse(res, 400, `Shop already exists with these GST credentials`)
            }


            // 4: upload image to cloudinary
            const { url, publicId } = await uploadToCloudinary(req.file.path)

            // 5 : create a shop
            const newShop = new ShopModel({
                name,
                owner: new mongoose.Types.ObjectId(req.user.id),
                location: {
                    address,
                    city,
                    state,
                    pinCode,
                    coordinates: {
                        lat, lng
                    }
                },
                phoneNumber,
                gst: {
                    number: gstNumber,
                    photo: {
                        url,
                        publicId
                    }
                },
            })

            const isCreated = await newShop.save();
            // 6: request the admin also for approval
            return this.standardResponse(res, 200, "Shop created", isCreated)
        } catch (error) {
            console.log("error in create shop ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }


    // 2: get all shops owned by vehicle-owner
    static getAllShops = async (req, res) => {
        try {
            const { ownerId } = req.params;

            if(!ownerId){
                return this.standardResponse(res,400,"Owner id missing")
            }

            const shops=await ShopModel.find({owner:ownerId}).select("location.address isActive location.city name status");

            return this.standardResponse(res,200,"Shops found",shops)
        } catch (error) {
            console.log("error in get all shops ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }

    // 3: get single shop
    static getSingleShop = async (req, res) => {
        try {
            const { shopId } = req.params;

            if(!shopId){
                return this.standardResponse(res,400,"Shop id missing")
            }

            const shop=await ShopModel.findById(shopId);

            return this.standardResponse(res,200,"Shop found",shop)

        } catch (error) {
            console.log("error in get single shop ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }



}

export default ShopController