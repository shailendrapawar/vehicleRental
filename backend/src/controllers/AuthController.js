import express from "express"
import { sendOtpSchema } from "../validations/authValidation.js"
import OtpModel from "../models/OtpModel.js"
import generateOtp from "../utils/otpGenerator.js"
import getMinutesLeft from "../utils/getMinutesLeft.js"

class AuthController {
    static standardResponse = async (res, status, msg, data = null) => {
        return res.status(status).json({
            msg,
            data
        })
    }

    //A: send OTP
    static sendOtp = async (req, res) => {
        try {
            const { error, value } = sendOtpSchema.validate(req.body)

            if (error) {
                return this.standardResponse(res, 400, `Validation error:- ${error.message}`)
            }

            const{email,purpose,role}=value

            // 1: check if already exists whose expire greater than now()
            const existingOtp=await OtpModel.findOne({
                email:email,
                purpose,
                role,
                expiresAt:{$gt:new Date()}
            })

            if(existingOtp){
                return this.standardResponse(res,400,`Otp already sent, try after ${getMinutesLeft(existingOtp.expiresAt)} minutes`);
            }

            // 2: generate otp and save to db
            const otpData=await generateOtp();
            console.log("otp data",otpData)

            const newOtp= new OtpModel({
                email:email,
                code:otpData.code,
                expiresAt:otpData.expiresAt,
                purpose,
                role
            })
            const isCreated=await newOtp.save()

            if(!isCreated){
                return this.standardResponse(res,400,"Error creating otp");
            }

            // 3: send via email
            return this.standardResponse(res,200,"Otp sent")

        } catch (error) {
            console.log("error in registering admin ")
            return this.standardResponse(res, 500, "Internal server error")

        }

    }
    static verifyOtp = async (req, res) => {

    }
}

export default AuthController;