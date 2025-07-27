import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import VehicleController from "../controllers/owner/vehicleController.js"
const ownerRouter=express.Router()
import uploadImages from "../middlewares/uploadImages.js"
import { checkRoleMiddleware } from "../middlewares/chekRoleMiddleware.js"
import ShopController from "../controllers/owner/shopController.js"




// 1:===================== shop routes====================

// A : create shop
ownerRouter.post("/create-shop",
    authMiddleware,
    checkRoleMiddleware(["owner"]),
    uploadImages.single("gstBill"),
    ShopController.createShop)

// B: gett all shops
ownerRouter.get("/get-all-shops/:ownerId",
    authMiddleware,
    checkRoleMiddleware(["owner"]),
    ShopController.getAllShops
)

// 2:=============== Vehicle routes==========================
// : add vehicle
ownerRouter.post("/add-vehicle",
    authMiddleware,
    checkRoleMiddleware(["owner","admin"]),
    uploadImages.array("vehicleImages",5),
    VehicleController.addVehicle);



export default ownerRouter;