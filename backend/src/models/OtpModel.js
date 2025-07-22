
import mongoose from "mongoose";

const otpSchema= new mongoose.Schema({
    email:{type:String,required:true},
    code:{type:String,required:true},
    expiresAt:{type:Date,required:true},
    purpose:{
        type:String,
        enum:["login","signup","verification","reset_password"],
        required:true
    },
    role:{
        type:String,
        enum:["admin","customer","owner"],
        required:true
    }
},{timestamps:true});

const OtpModel=mongoose.model("Otp",otpSchema);

export default OtpModel;