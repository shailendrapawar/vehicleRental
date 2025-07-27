import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";
configDotenv();

const authMiddleware = async (req, res, next) => {

    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                msg: "Unauthorized: No token provided"
            })
        }

        //decode token
        const user = await jwt.verify(token, process.env.SECRET_TOKEN);
        // console.log(user)
        req.user = user;
        next()

    } catch (error) {
        console.log("error in auth middleware", error)
        return res.status(403).json({ message: 'Forbidden: Invalid token' });

    }

}

export default authMiddleware