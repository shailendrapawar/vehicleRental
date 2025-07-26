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
        enum: ["petrol", "diesel", "electric", "hybrid"],
        required: true,
    },
    transmission: {
        type: String,
        enum: ["manual", "automatic"],
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
        url: { type: String, default: "" },
        publicId: { type: String, default: "" }
    }],

    specsLink: {
        type: String,// link to external spec site if admin adds it 
        default: ""
    },

    
    //statuses
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    isListed: {
        type: Boolean,
        default: false
    },
    operationalStatus: {
        type: String,
        enum: ['available', 'booked', 'maintenance', 'out_of_service'],
        default: 'available'
    }
}, {
    timestamps: true
})

const VehicleModel = mongoose.model("Vehicle", vehicleSchema);
export default VehicleModel;