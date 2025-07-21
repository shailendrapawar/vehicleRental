import express from "express"
import AdminAuthController from "../controllers/admin/adminAutController.js";
const adminRouter=express.Router();


//A: admin auth routes

adminRouter.post("/register-admin",AdminAuthController.registerAdmin);
// adminRouter.post("/login-admin")



export default adminRouter;