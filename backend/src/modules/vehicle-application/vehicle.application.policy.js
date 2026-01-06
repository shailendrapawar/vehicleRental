import mongoose, { get } from "mongoose"


export const VehicleApplicationPolicies = {

    admin: {
        getVehicleApplications: {
            query:{},
            projections: "registrationNumber vehicleType brand model status statusMessage createdAt",
            populate: [{path:"shop", select:"name location status"},{path:"owner", select:"name email profilePicture"}],
        },
        searchVehicleApplications: {
            query:{},
            projections: "registrationNumber vehicleType brand model status statusMessage createdAt",
            populate: [{path:"shop", select:"name location status"},{path:"owner", select:"name email profilePicture"}],
        },

    },

    owner: {
        getVehicleApplications: {
            query: (user) => ({ owner: new mongoose.Types.ObjectId(user._id) }),
            projections: "registrationNumber vehicleType brand model status statusMessage createdAt",
            populate: [{path:"shop", select:"name location"}],
        },
        searchVehicleApplications: {
            query: (user) => ({ owner: new mongoose.Types.ObjectId(user._id) }),
            projections: "registrationNumber vehicleType brand model status statusMessage createdAt",
            populate: [{path:"shop", select:"name location"}],
        },
        updateVehicleApplications: {
            query: (user) => ({ owner: new mongoose.Types.ObjectId(user._id) }),
            allowedFields: ['registrationNumber', 'vehicleType', 'brand', 'model', 'fuelType', 'transmission', 'seatingCapacity', 'mileage'],
        },
    },

    customer: {

    }


}