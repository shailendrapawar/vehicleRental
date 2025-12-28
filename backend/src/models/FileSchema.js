import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    originalName: { type: String, required: true },
    fileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    extension: { type: String },
    size: { type: Number, required: true },

    provider: {
        type: String,
        enum: ["local", "s3", "cloudinary"],
        required: true
    },

    path: String,   // local
    url: String,   // public or signed
    folder: String,   // cloudinary
    bucket: String,   // s3

    ownerType: { type: String }, // "Vehicle", "User"
    ownerId: { type: mongoose.Schema.Types.ObjectId },

    isPublic: { type: Boolean, default: false },

    status: {
        type: String,
        enum: ["active", "deleted"],
        default: "active"
    },
    meta: Object
}, {
    timestamps: true
})

const FileModel = mongoose.model("FileSchema", fileSchema)

export default FileModel;

