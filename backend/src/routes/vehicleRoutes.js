import express from "express"
import VehicleController from "../controllers/VehicleController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const vehicleRouter = express.Router();


vehicleRouter.get("/get-vehicles",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner', 'cutomer']),
    VehicleController.searchVehicles
)

vehicleRouter.get("/get-vehicles/:keyword",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner', 'customer']),
    VehicleController.getVehicle
)

vehicleRouter.post("/add-vehicle",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner']),
    upload.array('vehicleImages', 3),
    VehicleController.createVehicle
)

vehicleRouter.put("/update-vehicle/:vehicleId",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner']),
    VehicleController.updateVehicle
)






export default vehicleRouter;