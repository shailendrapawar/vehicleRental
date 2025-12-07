import express from "express"
import AuthController from "../controllers/AuthController.js";

const authRouter=express.Router()


authRouter.post("/intialize-admin",AuthController.initializeAdmin)

authRouter.post("/register-user",AuthController.userRegistration);
authRouter.post("/login-user",AuthController.userLogin);



authRouter.post("/send-otp",AuthController.sendOTP);
authRouter.post("/verify-otp",AuthController.verifyOTP);

export default authRouter;