import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import VehicleApplicationController from "../controllers/VehicleApplicationController.js"
import upload from "../middlewares/uploadMiddleware.js"
const vehicleApplicationRouter = express.Router()


vehicleApplicationRouter.get("/vehicle-application/:applicationId",
    authMiddleware,
    VehicleApplicationController.getVehicleApplication)


vehicleApplicationRouter.get("/vehicle-application",
    authMiddleware,
    VehicleApplicationController.searchVehicleApplication)


vehicleApplicationRouter.post("/vehicle-application",
    authMiddleware,
    upload.array('vehicleImages', 3),
    VehicleApplicationController.createVehicleApplication)


vehicleApplicationRouter.put("/vehicle-application/:applicationId",
    authMiddleware,
    VehicleApplicationController.updateVehicleApplication)



export default vehicleApplicationRouter;