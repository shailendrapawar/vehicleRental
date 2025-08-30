import mongoose from "mongoose"
import UserModel from "../../models/UserModel.js"
import { updateUserStatus } from "../../validations/admin/adminUserSchema.js"

class AdminUserController {

    // #=====standard response============
    static standardResponse = async (res, status, msg, data = null) => {
        return res.status(status).json({
            msg,
            data
        })
    }


    // A: get all user

    static getAllUsers = async (req, res) => {
        try {

            const { page = 1, limit = 10 } = req.query
            const users = await UserModel.find({}).select("name email role profilePicture status").lean()
            // console.log(users)

            return this.standardResponse(res, 200, "Users found", {
                hasMore: true,
                users,
                msg: "Users found"
            })

        } catch (error) {
            console.log("error in get all users", error)
            return this.standardResponse(res, 500, "Internal server error")
        }
    }


    // B: get single user

    static getSingleUser = async (req, res) => {
        try {

            const { userId } = req.params;
            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                return this.standardResponse(res, 400, "Invalid user id")
            }
            const user = await UserModel.findById(userId).lean()
            // console.log(user)

            return this.standardResponse(res, 200, "Users found", {
                msg: "User found",
                user
            })

        } catch (error) {
            console.log("error in get single users", error)
            return this.standardResponse(res, 500, "Internal server error")

        }
    }


    // C: update user 
    static updateUser = async (req, res) => {
        try {

            const { userId } = req.params;
            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                return this.standardResponse(res, 400, "Invalid user id")
            }

            const { error, value } = updateUserStatus.validate(req.body);

            if (error) {
                return this.standardResponse(res, 400, ` Validation error:- ${error.message}`)
            }
            const user = await UserModel.findById(userId)
            // console.log(user)

            if (user.status === value.status) {
                return this.standardResponse(res, 400, `User status already in ${value.status}`)
            }

            user.status = value.status
            user.statusMessage = value.statusMessage

            await user.save()

            return this.standardResponse(res, 200, `User status updated to ${value.status}`,)


        } catch (error) {
            console.log("error in update  user", error)
            return this.standardResponse(res, 500, "Internal server error")

        }
    }

}

export default AdminUserController