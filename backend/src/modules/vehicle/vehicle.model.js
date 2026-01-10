import mongoose from "mongoose"
import {
    VEHICLE_STATUSES, DEFAULT_VEHICLE_STATUS,
    OPERATIONAL_STATUSES, DEFAULT_OPERATION_STATUS,
    VEHICLE_TYPES,
    FUEL_TYPES
} from "../../constants/vehicle.js"

const vehicleSchema = new mongoose.Schema({

    // ownership fields==========================
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    shop: {
        type: mongoose.Types.ObjectId,
        ref: "Shop",
        required: true
    },

    // Identification fields======================
    registrationNumber: {
        type: String,
        trim: true,
        required: true,
        // unique: true,
    },
    vehicleType: {
        type: String,
        enum: VEHICLE_TYPES,
        required: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    colo: {
        type: String,
        deafault: ""
    },
    images: {
        type: [{
            url: { type: String, default: "" },
            publicId: { type: String, default: "" }
        }],
        default: []
    },


    // specs fields===========================
    fuelType: {
        type: String,
        enum: FUEL_TYPES,
        required: true,
    },
    transmission: {
        type: String,
        enum: ["manual", "automatic"],
        required: true,
    },

    seatingCapacity: {
        type: Number,
        required: true
    },

    mileage: {
        type: Number, // in kmpl or km/charge
        required: true
    },

    specsLink: {
        type: String,// link to external spec site if admin adds it 
        default: ""
    },

    //status fields================
    status: {
        type: String,
        enum: VEHICLE_STATUSES,
        default: DEFAULT_VEHICLE_STATUS
    },

    statusMessage: {
        type: String,
        default: ""
    },
    operationalStatus: {
        type: String,
        enum: OPERATIONAL_STATUSES,
        default: DEFAULT_OPERATION_STATUS
    },

    meta: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true
})

vehicleSchema.index(
    { registrationNumber: 1 },
    { unique: true, partialFilterExpression: { status: 'approved' } }
);

const VehicleModel = mongoose.model("Vehicle", vehicleSchema);
export default VehicleModel;