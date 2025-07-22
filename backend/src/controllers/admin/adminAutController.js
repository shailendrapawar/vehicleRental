// import UserModel from "../../models/UserModel.js"
import UserModel from "../../models/UserModel.js"
import { adminChangePasswordSchema, adminLoginSchema, intialAdminRegisterSchema } from "../../validations/admin/adminAuthSchema.js"
import { configDotenv } from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

configDotenv()
class AdminAuthController {
    // #=====standard response============
    static standardResponse = async (res, status, msg, data = null) => {
        return res.status(status).json({
            msg,
            data
        })
    }


    //A: register admin only once
    static registerAdmin = async (req, res) => {

        try {
            //1: validation check
            const { error, value } = intialAdminRegisterSchema.validate(req.body);
            if (error) {
                return this.standardResponse(res, 400, `Validation error:=- ${error.message}`)
            }

            const { secretCode, email, phone, name, password } = value
            //2: admin secret check
            if (secretCode !== process.env.ADMIN_SECRET) {
                return this.standardResponse(res, 400, `Admin secret validation failed`);
            }

            //3: check if admin already exists 
            const admin = await UserModel.findOne({ role: "admin" })
            if (admin) {
                return this.standardResponse(res, 400, "Admin  already exists")
            }

            //4: hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            //5: create user if not exists
            const newAdmin = new UserModel({
                name,
                email,
                phone,
                password: hashPassword,
                isVerified: true,
                role: "admin",
            })

            const isCreated = await newAdmin.save();

            return this.standardResponse(res, 200, "Admin created successfully", {
                name: isCreated.name,
                email: isCreated.email,
                role: isCreated.role,
                isVerified: isCreated.isVerified,
                profilePicture: isCreated.profilePicture
            })

        } catch (error) {
            console.log("error in registering admin ")
            return this.standardResponse(res, 500, "Internal server error")
        }
    }

    // B: admin login
    static adminLogin = async (req, res) => {
        try {
            const { error, value } = adminLoginSchema.validate(req.body);

            if (error) {
                return this.standardResponse(res, 400, `Validation error:=- ${error.message}`)
            }

            const { email, password } = value;

            //1: check for admin in users
            const isExist = await UserModel.findOne({ email }).select("email password role profilePicture");
            // console.log(isExist)
            if (!isExist) {
                return this.standardResponse(res, 400, "This user does not exists");
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


            return this.standardResponse(res, 200, "User logged in", user)
        } catch (error) {
            console.log("error in login admin ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }

    // C: change password
    static changePassword = async (req, res) => {

        try {
            const { error, value } = adminChangePasswordSchema.validate(req.body);

            // 1: check validations
            if (error) {
                return this.standardResponse(res, 400, `Validation error:=- ${error.message}`)
            }
            const { currentPassword, newPassword, confirmPassword } = value

            if (currentPassword === newPassword) {
                return this.standardResponse(res, 400, `New password cannot be current password`)
            }

            // 2: find user 
            const user = await UserModel.findById(req.user.id).select("password");
            console.log(user)

            // 3: compare password

            const isMatch = await bcrypt.compare(currentPassword, user.password);

            if (!isMatch) {
                return this.standardResponse(res, 400, "Wrong password");
            }

            // 4: replace new password
            const salt = await bcrypt.genSalt(10);
            const newHashPass = await bcrypt.hash(newPassword, salt);

            user.password = newHashPass;
            await user.save();

            return this.standardResponse(res, 200, "Password updated successfully");

        } catch (error) {
            console.log("error in admin  password reset ", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }
}



export default AdminAuthController