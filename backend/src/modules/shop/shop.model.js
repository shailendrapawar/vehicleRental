import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Shop name is required"],
            trim: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // shop belongs to a user
            required: true,
        },

        contact: {
            phone: { type: String, trim: true, default: "" },
            email: { type: String, lowercase: true, trim: true, default: "" },
        },

        photos: [{
            url: String,
            publicId: {
                type: String,
                default: ""
            }
        }],

        gstBill: {
            number: {
                type: String,
                unique: true
            },
            image: {
                url: String,
                publicId: {
                    type: String,
                }
            }
        },
        fleetSize: {
            type: Number,
            default: 0, // can be updated dynamically when vehicles are added/removed
        },

        location: {
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            pincode: Number,
            coords: {
                latitude: Number,
                longitude: Number
            }
        },

        status: {
            type: String,
            enum: ["pending", "approved", "banned", "inactive"],
            default: "pending",
        },
        statusMessage: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

const ShopModel = mongoose.model("Shop", shopSchema);
export default ShopModel;
