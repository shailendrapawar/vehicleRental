import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:["profile_image","vehicle_image","shop_image","gst_image","rc_images"]
    },
    originalName: { type: String, required: true },

    source:{
        provider:{
            type:String,
            default:"cloudinary",
        },
        url:{
            type:String,
            default:""
        },
        id:{
             type:String,
            default:""
        }
    },
    
    entity:{
        name:String,
        id:String,
    },

    visibleTo:[{
        type:String,
        enum:["admin","owner","customer"],
        default:["admin"],
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    meta: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true
})

const FileModel = mongoose.model("FileSchema", fileSchema)

export default FileModel;

