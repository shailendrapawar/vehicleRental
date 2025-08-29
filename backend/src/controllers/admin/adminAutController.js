// import UserModel from "../../models/UserModel.js"
import UserModel from "../../models/UserModel.js"
import { adminChangePasswordSchema , intialAdminRegisterSchema } from "../../validations/admin/adminAuthSchema.js"
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

            const { secretCode, email, name, password } = value
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

            //5: create admin if not exists
            const newAdmin = new UserModel({
                name,
                email,
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

    // B: change password
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