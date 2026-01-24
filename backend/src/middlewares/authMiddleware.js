import jwt from "jsonwebtoken"
import mongoose, { mongo } from "mongoose";
const authMiddleware = async (req, res, next) => {
    try {

        const { token } = req?.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "Authentication required" });
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decode)

        // let user = {
        //     ...decode,
        //     _id: mongoose.Types.ObjectId.createFromHexString(decode?._id)
        // }

        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" })
    }
}

export default authMiddleware 