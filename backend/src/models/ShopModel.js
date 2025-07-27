
import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    location: {
        address: String,
        city: String,
        state: String,
        pinCode: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },

    phoneNumber: {
        type:String,
        required:true
    },
    images: [{
        url: String,
        publicId: String
    }],

    gst: {
        number: String,
        photo: {
            url: String,
            publicId: String
        }
    },

    status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending"
    },

})

const ShopModel = mongoose.model("Shop", shopSchema);

export default ShopModel;

