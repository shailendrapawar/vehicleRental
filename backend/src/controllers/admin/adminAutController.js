// import UserModel from "../../models/UserModel.js"
import UserModel from "../../models/UserModel.js"
import { intialAdminRegisterSchema } from "../../validations/admin/adminAuthSchema.js"
import { configDotenv } from "dotenv"
import bcrypt from "bcrypt"

configDotenv()
class AdminAuthController {
    // #=====standard response============
    static standardResponse = async (res, status, msg, data = null) => {
        return res.status(status).json({
            msg,
            data
        })
    }

    //A: register initial admin only once

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

            //3: check if admin already exists with same credentials
            const admin = await UserModel.findOne({ $or: [{ email }, { phone }] })
            if (admin) {
                return this.standardResponse(res, 400, "Admin user already exists")
            }

            //4: hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            //4: create user if not exists
            const newAdmin = new UserModel({
                name,
                email,
                phone,
                password: hashPassword,
                role: "admin",
            })

            const isCreated = await newAdmin.save();
            return this.standardResponse(res, 200, "Admin created successfully",{
                name:isCreated.name,
                email:isCreated.email,
                role:isCreated.role,
                isVerified:isCreated.isVerified,
                profilePicture:isCreated.profilePicture
            })


        } catch (error) {

        }

    }
}

export default AdminAuthController