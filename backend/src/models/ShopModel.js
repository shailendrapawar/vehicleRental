
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
        type: String,
        required: true
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

    isActive:{
        type:Boolean,
        default:false
    },

    //admin controlled variables=====================
    status: {
        type: String,
        enum: ["pending", "verified", "rejected","banned"],
        default: "pending",
    },

    statusMessage: {
        type: String,
        default: null
    },

    submissionCount: {
        type: Number,
        default: 1
    },

})

const ShopModel = mongoose.model("Shop", shopSchema);

export default ShopModel;

