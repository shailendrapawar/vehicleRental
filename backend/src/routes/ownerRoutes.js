import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import VehicleController from "../controllers/owner/vehicleController.js"
const ownerRouter=express.Router()
import uploadImages from "../middlewares/uploadImages.js"


// 1: add vehicle
ownerRouter.post("/add-vehicle",authMiddleware,uploadImages.array("vehicleImages",3),VehicleController.addVehicle);



export default ownerRouter;