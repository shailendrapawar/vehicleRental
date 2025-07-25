import express from "express"
import { sendOtpSchema, userLoginSchema, userRegistrationSchema, verifyOtpSchema } from "../validations/userAuthValidation.js"
import OtpModel from "../models/OtpModel.js"
import generateOtp from "../utils/otpGenerator.js"
import getMinutesLeft from "../utils/getMinutesLeft.js"
import sendEmail from "../services/sendEmail.js"
import UserModel from "../models/UserModel.js"


import { configDotenv } from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

configDotenv()

class UserAuthController {
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

            const { email, purpose, role } = value

            // 1: check if already exists whose expire greater than now()
            const existingOtp = await OtpModel.findOne({
                email: email,
                purpose,
                role,
                expiresAt: { $gt: new Date() }
            })

            if (existingOtp) {
                return this.standardResponse(res, 400, `Otp already sent, try after ${getMinutesLeft(existingOtp.expiresAt)} minutes`);
            }

            // 2: generate otp and save to db
            const otpData = await generateOtp();

            const newOtp = new OtpModel({
                email: email,
                code: otpData.code,
                expiresAt: otpData.expiresAt,
                purpose,
                role
            })
            const isCreated = await newOtp.save()

            if (!isCreated) {
                return this.standardResponse(res, 400, "Error creating otp");
            }

            // 3: send OTP via email
            await sendEmail({ code: otpData.code, to: email, purpose })
            return this.standardResponse(res, 200, "Otp sent to email")

        } catch (error) {
            console.log("error in send otp ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }



    // B: Verify otp
    static verifyOtp = async (req, res) => {

        try {
            const { error, value } = verifyOtpSchema.validate(req.body);
            if (error) {
                return this.standardResponse(res, 400, `Validation error:- ${error.message}`)
            }

            const { email, code, purpose, role } = value;

            //1: check if any otp for tha purpose exists whithout expiry
            const existingOtp = await OtpModel.findOne({
                email,
                code,
                purpose,
                role,
                expiresAt: { $gt: new Date() },
                isVerified: false
            })

            if (!existingOtp) {
                return this.standardResponse(res, 400, "Invalid or expired OTP")
            }

            // 2: set isVerified true
            existingOtp.isVerified = true;
            await existingOtp.save();

            return this.standardResponse(res, 200, 'OTP verified successfully');

        } catch (error) {
            console.log("error in send otp ", error)
            return this.standardResponse(res, 500, "Internal server error")

        }
    }


    //C : user registration
    static userRegistration = async (req, res) => {
        console.log(req.body);

        try {

            const { error, value } = userRegistrationSchema.validate(req.body);
            if (error) {
                return this.standardResponse(res, 400, `Validation error:=- ${error.message}`)
            }

            const { firstName, lastName, email, password, registerAs, dob, registerOtp } = value;

            //1: check for existing user
            const isExist = await UserModel.findOne({ email })

            if (isExist) {
                return this.standardResponse(res, 400, "User alredy Exists with this email")
            }


            // 2: check for issued otp for login purpose
            const now = new Date();
            const isIssued = await OtpModel.findOne({ email, code: registerOtp, purpose: "signup", expiresAt: { $gt: now }, isVerified: true });
            if (!isIssued) {
                return this.standardResponse(res, 400, "Otp not verified")
            }

            //3: hash password
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hashSync(password, salt)

            // 4: create user
            const newUser = new UserModel({
                name: `${firstName} ${lastName}`,
                email,
                password: hashPass,
                role: registerAs,
                dob: new Date(dob),
                isVerified: true
            })

            await newUser.save();

            return this.standardResponse(res, 200, "User Created",)

        } catch (error) {
            console.log("error in send otp ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }


    // D: user-login 
    static userLogin = async (req, res) => {
        try {
            const { error, value } = userLoginSchema.validate(req.body);

            if (error) {
                return this.standardResponse(res, 400, `Validation error:=- ${error.message}`)
            }

            const { email, password } = value;

            //1: check for admin in users
            const isExist = await UserModel.findOne({ email }).select("email password role profilePicture");

            if (!isExist) {
                return this.standardResponse(res, 400, "User not registered");
            }

            //2: check for valid password
            const isValid = await bcrypt.compare(password, isExist.password)
            if (!isValid) {
                return this.standardResponse(res, 400, "Invalid credentials");
            }

            //3: delete password
            const user = isExist.toObject();
            delete user.password;

            //4: generate token
            const token = jwt.sign({
                id: user._id,
                role: user.role
            }, process.env.SECRET_TOKEN, { expiresIn: "1d" })

            //5:set cookies
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", //only in production
                maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
            })

            return this.standardResponse(res, 200, "User logged in", { ...user, token })
        } catch (error) {
            console.log("error in login admin ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }
}

export default UserAuthController;