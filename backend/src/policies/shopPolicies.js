

import mongoose from "mongoose";

export const ShopPolicy = {
    admin: {
        getShops: {
            query:{},
            projections: "name location fleetSize status"
        },
        getSingleShop: {
            query: ({}),
            projections: "name location photos status statusMessage fleetSize gstBill owner",
            populate: [{ path: "owner", select: "name email profilePicture" }],
        },
         updateShop: {
            query: ({}),
            projections:"name status statusMessage location contact owner",
            allowedFields:['name','status','statusMessage','location','contact']
        },
    },
    owner: {
        getShops: {
            query: (user) => ({ owner: user._id }),
            projections: "name location fleetSize status"
        },

        getSingleShop: {

            query: (user) => ({ owner: new mongoose.Types.ObjectId(user._id) }),

            projections: (user, shop) => {
                // console.log(shop)
                if (shop && user._id.toString() === shop.owner.toString()) {
                    return "name location photos status statusMessage fleetSize gstBill"
                }
                return "name location photos fleetSize"
            },
            populate: [],
        },

        updateShop: {
            query: (user, data) => ({ owner: new mongoose.Types.ObjectId(user._id) }),

            allowedFields: (user, shop) => {
                if (shop && shop.owner.toString() === user._id.toString()) {
                    return [ 'photos','name']
                }
                return null||[]
            }
        },

    },
    customer: {

        getShops: {
            query:({ status:"approved" }),
            projections: "name location fleetSize status"
        },

        getSingleShop: {

            query:({ status:"approved" }),

            projections:"name photos fleetSize owner location",
            
            populate: [{ path: "owner", select: "name profilePicture" }],
        },
        
    }
}