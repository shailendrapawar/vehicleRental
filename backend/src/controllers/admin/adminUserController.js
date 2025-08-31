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

            const { page = 1, limit = 1 } = req.query
            const skip = (page - 1) * limit

            let users = await UserModel.find({}).select("name email role profilePicture status").skip(skip).limit(limit + 1).lean()
            // console.log(users)

            let hasMore;

            if (users.length > limit) {
                hasMore = true
                users = users.splice(users.length - 1, 1)
            } else {
                hasMore = false
            }

            return this.standardResponse(res, 200, "Users found", {
                hasMore,
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
            //  console.log(userId)

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
            console.log("error in get single users:admin", error)
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
            console.log("error in update  user:admin", error)
            return this.standardResponse(res, 500, "Internal server error")

        }
    }

    // D: get kpi Data
    static getUserKpiData = async (req, res) => {
        try {

            const totalUsers=await UserModel.find({}).countDocuments().lean()

            const usersByRole = await UserModel.aggregate([
                { $group: { _id: "$role", totalUsers: { $sum: 1 } } },
            ])
            

            let owners, customers
            usersByRole.map((v,i)=>{
                if(v._id==="owner"){
                   return owners=v.totalUsers
                }

                if(v._id==="customer"){
                   return customers=v.totalUsers
                }
            })

           return this.standardResponse(res,200,"Kpi data found for admin user",{totalUsers,owners,customers})

        } catch (error) {
            console.log("error in admin kpi-user", error)
            return this.standardResponse(res, 500, "Internal server error")

        }
    }

}

export default AdminUserController