import express from "express"
import AuthController from "../controllers/AuthController.js";
const authRouter=express.Router();

authRouter.post("/send-otp",AuthController.sendOtp);
authRouter.post("/verify-otp",AuthController.verifyOtp);


export default authRouter;