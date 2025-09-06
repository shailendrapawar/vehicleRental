import mongoose from "mongoose";
import ShopModel from "../../models/ShopModel.js";
import { updateShopStatusSchema} from "../../validations/admin/shopValidations.js"

class AdminShopController {

    // #=====standard response============
    static standardResponse = async (res, status, msg, data = null) => {
        return res.status(status).json({
            msg,
            data
        })
    }

    static getAllShops = async (req, res) => {
        try {

            // calculate skip 
            const { limit = 10, page = 1 } = req.params;
            const skip = (page - 1) * limit


            // find shops with limit+1  to calculate hasMore
            let shops = await ShopModel.find().select("name status location.coordinates location.city isActive submissionCount").populate({
                path: "owner",
                select: "name"
            }).skip(skip).limit(limit + 1).lean()

            let hasMore;

            if (shops.length > limit) {
                hasMore = true
                shops = shops.splice(shops.length - 1, 1)
            } else {
                hasMore = false
            }

            return this.standardResponse(res, 200, "Shops found", {
                shops,
                hasMore
            })

        } catch (error) {
            console.log("error in get all shops", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }

    static getSingleShop = async (req, res) => {
        try {

            const { shopId } = req.params;

            if (!shopId || !mongoose.Types.ObjectId.isValid(shopId)) {
                return this.standardResponse(res, 400, "Invalid id");
            }

            const shop = await ShopModel.findById(shopId).populate({
                path: "owner",
                select: "name profilePicture email"
            }).lean();

            return this.standardResponse(res, 200, "Shop found", shop)
        } catch (error) {
            console.log("error in get single shops", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }

    static updateShopStatus = async (req, res) => {
        try {
            const { shopId } = req.params;
            // console.log(shopId)
            if (!shopId || !mongoose.Types.ObjectId.isValid(shopId)) {
                return this.standardResponse(res, 400, `Invalid shop id`)
            }

            const { error, value } = updateShopStatusSchema.validate(req.body);

            if (error) {
                return this.standardResponse(res, 400, `Validation error :- ${error.message}`)
            }

            // 2: get shop
            const shop = await ShopModel.findById(shopId).select("status statusMessage")

            // 3: check for existing 
            if (shop.status === value.status) {
                return this.standardResponse(res, 200, `Status already in ${value.status}`)
            }

            shop.status = value.status,
                shop.statusMessage = value.statusMessage;

            await shop.save();
            return this.standardResponse(res, 200, `Status updated to ${value.status}`)


        } catch (error) {
            console.log("error in banning shop ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }

    static getShopKpiData = async (req, res) => {

        try {

            const aggregateData = await ShopModel.aggregate([
                {
                    $facet: {
                        //  Active users count
                        activeShopCount: [
                            { $match: { isActive: true } },
                            { $count: "totalActiveShops" }
                        ],

                        //  Group by status
                        statusWiseShops: [
                            { $group: { _id: "$status", count: { $sum: 1 } } }
                        ],

                        // total shops
                        totalShops: [
                            { $count: "totalShops" }
                        ]
                    }
                }
            ])
            
            const finalResult=aggregateData[0];
            // console.log(finalResult)

            let kpiData={
                activeShops:finalResult?.activeShopCount[0].totalActiveShops,
                totalShop:finalResult?.totalShops[0].totalShops,
                statusWiseShops:finalResult?.statusWiseShops
            }

            return this.standardResponse(res, 200, "Kpi data for shops", kpiData)

        } catch (error) {
            console.log("error in admin:getKpiData shop ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }

    }

}

export default AdminShopController;