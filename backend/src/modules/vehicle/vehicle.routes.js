import express from "express"
import VehicleController from "./vehicle.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../../middlewares/checkRoleMiddleware.js";
import upload from "../../middlewares/uploadMiddleware.js";

const vehicleRouter = express.Router();


vehicleRouter.get("/:id",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner', 'cutomer']),
    VehicleController.get
)

vehicleRouter.get("/",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner', 'customer']),
    VehicleController.search
)

vehicleRouter.post("/",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner']),
    VehicleController.create
)

vehicleRouter.put("/:id",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner']),
    VehicleController.update
)






export default vehicleRouter;