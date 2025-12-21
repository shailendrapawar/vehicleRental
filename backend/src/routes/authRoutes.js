import express from "express"
import AuthController from "../controllers/AuthController.js";

const authRouter=express.Router()


authRouter.post("/intialize-admin",AuthController.initializeAdmin)

authRouter.post("/register",AuthController.userRegistration);
authRouter.post("/login",AuthController.userLogin);



authRouter.post("/send-otp",AuthController.sendOTP);
authRouter.post("/verify-otp",AuthController.verifyOTP);

export default authRouter;