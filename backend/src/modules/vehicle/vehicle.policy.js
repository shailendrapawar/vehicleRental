import mongoose from "mongoose"


export const VehiclePolicies = {

    admin: {
        getVehicle: {
            query: {},
            projections: "owner shop registrationNumber vehicleType brand model images fuelType transmission seatingCapacity mileage specsLink status statusMessage isListed operationalStatus",
            populate: [{ path: "owner", select: "-password" }, { path: "shop" }]
        },
        searchVehicles: {
            query: {},
            projections: "shop vehicleType brand model images status operationalStatus",
            populate: [{ path: "shop", select: "name location status" }],
        },
        updateVehicle: {
            query: {},
            // projections:"owner shop registrationNumber vehicleType brand model images fuelType transmission seatingCapacity mileage specsLink status statusMessage isListed operationalStatus",
            populate: [{ path: "shop", select: 'name location status' }, { path: "owner", select: 'name profilePicture email' }],
            allowedFields: ["status", "statusMessage", "operationalStatus", "isListed", "specslink"]
        }

    },

    owner: {
        getVehicle: {
            query: (user) => ({
                owner: new mongoose.Types.ObjectId(user._id)
            }),

            populate: [{ path: "owner", select: "name profilePicture email" }, { path: "shop", select: "name location status" }],

            projections: (user, vehicle) => {
                let projection = "owner shop registrationNumber vehicleType brand model images fuelType transmission seatingCapacity mileage specsLink"

                //check for owner 
                if (vehicle && user._id.toString() === vehicle.owner._id.toString()) {
                    //means the owner is vehicle owner as well
                    projection = projection + ' ' + "status statusMessage isListed operationalStatus";
                    return projection
                }

                // heck for status  for customer or other shop owner access
                if ((vehicle && vehicle.shop.status !== "approved") || (vehicle && vehicle.status !== "approved")) {
                    //if shop/vehicle is not apporved return null
                    return null
                }

                //else the shop and vehicle is approved and can be visile to other owners as well with limited fields
                return projection
            },
        },
        searchVehicles: {
            query: (user) => ({
                owner: new mongoose.Types.ObjectId(user._id)
            }),
            populate: [{ path: "shop", select: "name location status" }],
            projections: "shop registrationNumber vehicleType brand model images  status isListed operationalStatus fuelType transmission mileage"
        },
        updateVehicle: {
            query: (user) => ({
                owner: new mongoose.Types.ObjectId(user._id)
            }),
            // projections:"owner shop registrationNumber vehicleType brand model images fuelType transmission seatingCapacity mileage specsLink status statusMessage isListed operationalStatus",
            populate: [{ path: "shop", select: 'name location status' }, { path: "owner", select: 'name profilePicture email' }],
            allowedFields: (user, vehicle) => {
                //check for owner 
                if (vehicle && user._id.toString() === vehicle.owner._id.toString()) {
                    //means the owner is vehicle owner as well
                    return ["operationalStatus", "isListed", "specslink"];
                }
                //it menans some other owner is trying to update the vehicle which is not allowed
                return []
            }
        },


        customer: {
            getVehicle: {
                query: { status: "approved" },
                projections: "owner shop registrationNumber vehicleType brand model images fuelType transmission seatingCapacity mileage specsLink",
                populate: [{ path: "owner", select: "name profilePicture email" }, { path: "shop", select: " name location status" }]

            },
            searchVehicles: {
                query: { status: "approved" },
                projections: "shop vehicleType brand model images operationalStatus",
                populate: [{ path: "shop", select: "name location status" }, { path: "owner", select: "name profilePicture" }],
            },
        }

    }
}