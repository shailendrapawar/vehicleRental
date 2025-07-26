import express from "express"
import AdminAuthController from "../controllers/admin/adminAutController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const adminRouter=express.Router();


//A: admin auth routes
adminRouter.post("/register-admin",AdminAuthController.registerAdmin);
adminRouter.post("/change-password",authMiddleware,AdminAuthController.changePassword)


// adminRouter.post("/login-admin")



export default adminRouter;