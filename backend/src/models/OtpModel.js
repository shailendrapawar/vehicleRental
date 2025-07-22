import { required } from "joi";
import mongoose from "mongoose";

const otpSchema= new mongoose.Schema({
    code:{type:String,required:true},
    expiresAt:{type:Date,required:true},
    pupose:{
        type:String,
        enum:["login","signup","verification","forgot_password"],
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