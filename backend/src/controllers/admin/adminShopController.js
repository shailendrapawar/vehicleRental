import ShopModel from "../../models/ShopModel.js";
import { banVehicleSchema, rejectVehicleSchema } from "../../validations/admin/shopValidations.js";


class AdminShopController {

    // #=====standard response============
    static standardResponse = async (res, status, msg, data = null) => {
        return res.status(status).json({
            msg,
            data
        })
    }

    // A : approve a shop
    static approveShop = async (req, res) => {
        try {

            const { shopId } = req.params;

            // 1: find shop 
            const shop = await ShopModel.findById(shopId)
            if (!shop) {
                return this.standardResponse(res, 400, "Shop not found");
            }

            // 2: return back if status !=pending
            if (shop.status !== "pending" || shop.status !== "banned") {
                return this.standardResponse(res, 400, `Shop either rejected or already verified`)
            }

            shop.status = "verified"
            shop.statusMessage = ""

            // 3: save and notify shop owner
            await shop.save()

            return this.standardResponse(res, 200, "Shop request approved");

        } catch (error) {
            console.log("error in approve shop ")
            return this.standardResponse(res, 500, "Internal server error")
        }
    }


    // B: reject shop
    static rejectShop = async (req, res) => {
        try {

            // 1: initial validation
            const { error, value } = rejectVehicleSchema.validate(req.body)
            if (error) {
                return this.standardResponse(res, 400, `Validation error :- ${error.message}`)
            }

            const { shopId, statusMessage } = value

            // 2: find shop if exists
            const shop = await ShopModel.findById(shopId);
            if (!shop) {
                return this.standardResponse(res, 400, `Shop not found`)
            }

            // 3: return back if status !=pending
            if (shop.status !== "pending") {
                return this.standardResponse(res, 400, `Shop either verified or already rejected`)
            }

            //4 : update reject fields
            shop.status = "rejected"
            shop.statusMessage = statusMessage

            await shop.save();
            return this.standardResponse(res, 200, `Shop request rejected`)

        } catch (error) {
            console.log("error in reject shop ")
            return this.standardResponse(res, 500, "Internal server error")
        }
    }


    // C : ban a account ==========
    static toggleBan = async (req, res) => {
        try {
            // 1: initial validation
            const { error, value } = banVehicleSchema.validate(req.body)
            if (error) {
                return this.standardResponse(res, 400, `Validation error :- ${error.message}`)
            }

            const { shopId, statusMessage } = value

            // 2: find shop if exists
            const shop = await ShopModel.findById(shopId);
            if (!shop) {
                return this.standardResponse(res, 400, `Shop not found`)
            }

            // 3: return if either status pending or rejected
            if(shop.status==="pending"||shop.status==="rejected"){
                return this.standardResponse(res,400,"vehicle not listed in system")
            }

            // 4: toggle ban account
            if (shop.status === "verified") {
                //ban account
                shop.status="banned"
                shop.statusMessage=statusMessage;
            }else{
                //unban account
                shop.status = "verified"
                shop.statusMessage=""
            }
  
            await shop.save()
            return this.standardResponse(res, 200, `Action successfull`)

        } catch (error) {
            console.log("error in banning shop ")
            return this.standardResponse(res, 500, "Internal server error")

        }
    }

}

export default AdminShopController;