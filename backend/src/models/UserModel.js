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
        trim: true,
        select: false,
        // required: true
    },
    role: {
        type: String,
        enum: ["customer", "owner", "admin"],
        default: "customer"
    },
    isVerified: {
        type: Boolean,
        default: false,
        select: false
    },
    
    profilePicture: {
        url: {
            type: String,
            default: "https://as1.ftcdn.net/v2/jpg/15/53/26/50/1000_F_1553265086_LRdX34X7hnx5EQ8GMmmohIQttweIbRRP.jpg"
        },
        publicId: { type: String, default: "" }
    },
        status:{
        type:String,
        enum:['approved','banned'],
        default:'approved'
    },
    statusMessage:{
        type:String,
        default:""
    },


}, {
    timestamps: true
})
const UserModel = mongoose.model("User", userSchema);
export default UserModel;