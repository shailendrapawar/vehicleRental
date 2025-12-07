import UserModel from "../models/UserModel.js";
import logger from "../utils/logger.js";
import { initializeAdminSchema, sendOTPSchema, userLoginSchema, userRegistrationSchema, verifyOTPSchema } from "../validators/AuthValidator.js";
import BaseController from "./BaseController.js";
import { configDotenv } from "dotenv";
configDotenv()

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// import REGEX from "../utils/regex.js";
import generateSecureOTP from "../utils/generateOtp.js";
import OtpModel from "../models/OtpModel.js";
import OtpService from "../services/OtpService.js";
import { EmailService } from "../providers/emails/index.js";

class AuthController extends BaseController {


    // A: intialize admin
    static initializeAdmin = async (req, res) => {
        try {

            // check if admin already exists
            const isExists = await UserModel.findOne({ role: "admin" }).lean();
            if (isExists) {
                return this.handleError(res, 400, { message: "Admin already Exists" })
            }

            // check for validation
            const { error, value } = initializeAdminSchema.validate(req.body);
            if (error) {
                return this.handleError(res, 400, error)

            }

            const { firstName, lastName, email, password, dob, token } = value

            // check for secret token
            if (token !== process.env.ADMIN_INIT_TOKEN) {
                logger.warn("Invalid admin intializing token")
                return this.handleError(res, 400, { message: "Invalid intializing token" })
            }

            // hash pass
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);


            // create user
            const newAdmin = new UserModel({
                name: `${firstName} ${lastName}`,
                email,
                password: hashPass,
                role: "admin",
                dob,
            })

            const data = await newAdmin.save()
            logger.success(`Admin intialized: ${data?._id}`)
            return this.handleResponse(res, 200, "admin created")

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, { message: "Internal server error" })
        }
    }


    // B: user-registration
    static userRegistration = async (req, res) => {
        try {
            const { error, value } = userRegistrationSchema.validate(req.body);
            if (error) {
                return this.handleError(res, 400, error)
            }

            // check for existing user
            const user = await UserModel.findOne({ email: value.email })

            if (user) {
                logger.warn(`User already exists with email: ${value.email}, User creation failed`)
                return this.handleError(res, 400, { message: "User already exists with these credentials,Try log-in" })
            }

            //check if otp is verified for signup purpose  then proceed
            const isOtpVerified = await OtpService.get(OtpModel, { email: value.email, purpose: "signup", isVerified: true, otp: value.otp }, { lean: true });

            if (!isOtpVerified) {
                return this.handleError(res, 400, { message: "OTP not verified. Please verify OTP to proceed." })
            }

            const { firstName, lastName, email, password, registerAs, dob } = value

            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);

            const newUser = new UserModel({
                name: `${firstName} ${lastName}`,
                email,
                password: hashPass,
                role: registerAs,
                dob,
            })

            const isCreated = await newUser.save()
            logger.success(`User created: ${isCreated?._id}`)
            return this.handleResponse(res, 200, "User created")
        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, { message: "Internal server error" })
        }
    }

    // user-login
    static userLogin = async (req, res) => {
        try {

            const { error, value } = userLoginSchema.validate(req.body);
            if (error) {
                return this.handleError(res, 400, error)
            }

            const { email, password } = value;

            // find user
            const user = await UserModel.findOne({ email }).select('password email profilePicture role status').lean();
            if (!user) {
                return this.handleError(res, 400, { message: "User dosent exists" })
            }

            // check password
            const isValid = await bcrypt.compare(password, user?.password);
            if (!isValid) {
                return this.handleError(res, 400, { message: "Invalid credentials" })
            }

            // created token
            const token = await jwt.sign({
                _id: user?._id,
                role: user.role
            }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            })


            //set token
            res.cookie("token", token, {
                httpOnly: true,      // prevents JS access
                secure: process.env.NODE_ENV === "production", // only HTTPS in prod
                sameSite: "strict",  // CSRF protection
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });


            delete user.password

            logger.success(`User logged in: ${user?._id}`)

            return this.handleResponse(res, 200, "User Logged-in", user)
        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, { message: "Internal server error" })
        }
    }

    // send otp
    static sendOTP = async (req, res) => {
        try {
            //1: schema validation check 
            const { error, value } = sendOTPSchema.validate(req.body);
            if (error) {
                return this.handleError(res, 400, { message: `Validation error: ${error.message}` })
            }
            const { email, purpose, role } = value;
            logger.info(`Otp request received for ${email} for ${purpose}`)

            //2: check if already requested for otp in last 10 mins
            const isExists = await OtpService.get(OtpModel, { email, purpose, role, isVerified: false, createdAt: { $gt: new Date(Date.now() - 10 * 60 * 1000) } }, { lean: true });
            if (isExists) {
                logger.warn(`OTP already sent to ${email} for ${purpose}, returning back`)
                return this.handleError(res, 400, { message: `OTP already sent to ${email} for ${purpose}. Please try again after some time.` })
            }

            // 3: generate otp
            const { otp, expiresIn, createdAt } = generateSecureOTP()

            // 4: save otp to db
            await OtpService.create(OtpModel, { ...value, otp, expiresIn, createdAt })
            logger.info(`OTP sent to ${email} for ${purpose}`)

            // send otp to mail
            const isMailSent = await EmailService({ to: email, purpose, otp });

            // return if mail not sent
            if (!isMailSent.success || isMailSent.success === false) {
                logger.error(`Failed to send OTP email to ${email} for ${purpose}`)
                return this.handleError(res, 500, { message: "Failed to send OTP email. Please try again later." })
            }

            logger.success(`OTP email sent to ${email} for ${purpose}`)
            return this.handleResponse(res, 200, `OTP sent to ${email} for ${purpose}`)
        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, { message: "Internal server error" })
        }
    }

    //verify otp
    static verifyOTP = async (req, res) => {
        try {
            const { error, value } = verifyOTPSchema.validate(req.body);
            const { email, purpose, otp } = value;
            logger.info(`Verifying OTP..., aginst ${value.email} for ${value.purpose}`)
            if (error) {
                return this.handleError(res, 400, { message: `Validation error: ${error.message}` })
            }

            // search otp in db
            const result = await OtpService.get(OtpModel, { email, purpose, otp, isVerified: false, expiresIn: { $gt: new Date() } }, { lean: false });

            if (!result) {
                return this.handleError(res, 400, { message: "Invalid or expired OTP" })
            }

            // mark otp as verified
            result.isVerified = true;
            await result.save();
            logger.success(`Marking isVerified true, for otp: ${result._id}`)


            logger.info(`OTP verified for ${email} for ${purpose}`)
            return this.handleResponse(res, 200, "OTP verified successfully")
        } catch (error) {
            logger.error(error)
            return this.handleError(res, 400, { message: "Internal server error" })
        }


    }


}

export default AuthController