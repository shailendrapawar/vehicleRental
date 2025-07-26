import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import VehicleController from "../controllers/owner/vehicleController.js"
const ownerRouter=express.Router()
import uploadImages from "../middlewares/uploadImages.js"
import { checkRoleMiddleware } from "../middlewares/chekRoleMiddleware.js"


// 1: add vehicle
ownerRouter.post("/add-vehicle",
    authMiddleware,
    checkRoleMiddleware(["owner","admin"]),
    uploadImages.array("vehicleImages",5),
    VehicleController.addVehicle);



export default ownerRouter;