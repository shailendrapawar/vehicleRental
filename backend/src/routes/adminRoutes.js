import express from "express"
import AdminAuthController from "../controllers/admin/adminAutController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../middlewares/chekRoleMiddleware.js";
import AdminShopController from "../controllers/admin/adminShopController.js";
import AdminVehicleController from "../controllers/admin/adminVehicleController.js";

const adminRouter = express.Router();


// 1:===============admin auth routes==================
adminRouter.post("/register-admin", AdminAuthController.registerAdmin);
adminRouter.post("/change-password", authMiddleware, checkRoleMiddleware(["admin"]), AdminAuthController.changePassword)



// 2: ===========admin shop routes =====================

// A: approve shop
adminRouter.post("/shop/approve-shop/:shopId",
    authMiddleware, checkRoleMiddleware(["admin"]),
    AdminShopController.approveShop)

// B: reject shop
adminRouter.post("/shop/reject-shop",
    authMiddleware, checkRoleMiddleware(["admin"]),
    AdminShopController.rejectShop)

// C: toggle banning a shop
adminRouter.post("/shop/toggle-ban",
    authMiddleware, checkRoleMiddleware(["admin"]),
    AdminShopController.toggleBan)

// D: get all shops
adminRouter.get("/shop/get-all-shops",
    authMiddleware,checkRoleMiddleware(['admin']),
    AdminShopController.getAllShops)

adminRouter.get("/shop/get-single-shop/:shopId",
      authMiddleware, checkRoleMiddleware(["admin"]),
    AdminShopController.getSingleShop
)

adminRouter.put("/shop/update-shop-status",
    authMiddleware,checkRoleMiddleware(['admin'])
)



// 3: ============admin vehicle routes================
adminRouter.get("/vehicle/get-all-vehicles",
    authMiddleware, checkRoleMiddleware(["admin"]),
    AdminVehicleController.getVehicles)

adminRouter.get("/vehicle/get-vehicle/:vehicleId",
    authMiddleware, checkRoleMiddleware(["admin"]),
    AdminVehicleController.getSingleVehicle)

    
adminRouter.put("/vehicle/update-vehicle/:vehicleId",
    authMiddleware, checkRoleMiddleware(["admin"]),
    AdminVehicleController.updateVehicle)

export default adminRouter;