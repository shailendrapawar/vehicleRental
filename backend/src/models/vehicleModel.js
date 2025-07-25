import mongoose from "mongoose"
const vehicleSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    vehicleType: {
        type: String,
        enum: ["bike", "scooty", "car"],
        required: true
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    fuelType: {
        type: String,
        enum: ["petrol", "diesel", "electric", "Hybrid"],
        required: true,
    },
    transmission: {
        type: String,
        enum: ["Manual", "Automatic"],
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    color: {
        type: String,
    },
    seatingCapacity: {
        type: Number,
    },

    mileage: {
        type: Number, // in kmpl or km/charge
    },

    images: [{
        url: "",
        puublicId: ""
    }],
    specsLink: {
        type: String, // link to external spec site if admin adds it
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
},{
    timestamps:true
})

const VehicleModel=mongoose.model("Vehicle",vehicleSchema);
export default VehicleModel;