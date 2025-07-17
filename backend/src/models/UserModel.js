import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false // hides password by default
    },
    phone: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ["customer", "owner", "admin"],
        default: "customer"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    profilePic: {
        url:{ type: String },
        publicId:{ type: String }
    },


},{
    timestamps:true
})
const UserModel = mongoose.model("User", userSchema);
export default UserModel;