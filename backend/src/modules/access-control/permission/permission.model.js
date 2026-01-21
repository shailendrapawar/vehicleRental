import mongoose from "mongoose"

const schema = new mongoose.Schema({

    // eg: vehicle.create, booking.view
    key: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },

    //eg: shop, vehicle, booking
    module: {
        type: String,
        required: true,
        index: true,
    },

    //description for human-readable
    description: {
        type: String,
        trim: true
    },

    // for soft deletion
    isActive: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    })

const PermissionModel = mongoose.model("permission", schema);

export default PermissionModel;