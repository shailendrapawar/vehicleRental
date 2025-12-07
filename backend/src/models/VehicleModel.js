import mongoose from "mongoose"

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
        enum: ["bike", "scooty", "car"],
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
        enum: ["petrol", "diesel", "electric", "hybrid"],
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
        enum: ['pending', 'approved', 'rejected', "banned"],
        default: 'pending'
    },

    statusMessage: {
        type: String,
        default: ""
    },

    isListed: {
        type: Boolean,
        default: false
    },
    operationalStatus: {
        type: String,
        enum: ['available', 'booked', 'maintenance', 'out_of_service'],
        default: 'available'
    },
}, {
    timestamps: true
})

vehicleSchema.index(
    { registrationNumber: 1 },
    { unique: true, partialFilterExpression: { status: 'approved' } }
);

const VehicleModel = mongoose.model("Vehicle", vehicleSchema);
export default VehicleModel;