
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
        url: {
           type: String,
           default:"https://imgs.search.brave.com/LIKjMr0hRs3A6NgRuDgpt4-2PvTI6UW6ysm5H0WjSWE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/c2hvcC1pbGx1c3Ry/YXRpb25fMjMtMjE0/NzUxNDIyMy5qcGc"
        },
        publicId: {
            type:String,
            default:""
        }
    }],

    gst: {
        number: String,
        photo: {
            url: String,
            publicId: String
        }
    },

    isActive: {
        type: Boolean,
        default: false
    },

    //admin controlled variables=====================
    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "banned"],
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

