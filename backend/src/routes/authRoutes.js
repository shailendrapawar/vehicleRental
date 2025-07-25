import express from "express"
import AuthController from "../controllers/AuthController.js";
import AdminAuthController from "../controllers/admin/adminAutController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const authRouter=express.Router();

// otp routes===
authRouter.post("/send-otp",AuthController.sendOtp);
authRouter.post("/verify-otp",AuthController.verifyOtp);


//register and login routes for all user

authRouter.post("/user-registration",AuthController.userRegistration)
authRouter.post("/user-login",AuthController.userLogin);

export default authRouter;