import express from "express";
import OtpController from "./otp.controller.js";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../../../middlewares/checkRoleMiddleware.js";

const otpRouter = express.Router();

// Send OTP - public route (no auth required)
otpRouter.post("/send",
    OtpController.sendOTP
)

// Verify OTP - public route (no auth required)
otpRouter.post("/verify",
    OtpController.verifyOTP
)

// Get OTP by ID - admin only
otpRouter.get("/:id",
    authMiddleware,
    checkRoleMiddleware(['admin']),
    OtpController.get
)

// Search OTPs - admin only
otpRouter.get("/",
    authMiddleware,
    checkRoleMiddleware(['admin']),
    OtpController.search
)

export default otpRouter
