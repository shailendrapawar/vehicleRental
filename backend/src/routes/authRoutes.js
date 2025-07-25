import express from "express"
import UserAuthController from "../controllers/UserAuthController.js";
const authRouter=express.Router();

// otp routes===
authRouter.post("/send-otp",UserAuthController.sendOtp);
authRouter.post("/verify-otp",UserAuthController.verifyOtp);


//register and login routes for all user

authRouter.post("/user-registration",UserAuthController.userRegistration)
authRouter.post("/user-login",UserAuthController.userLogin);

export default authRouter;