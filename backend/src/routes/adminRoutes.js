import express from "express"
import AdminAuthController from "../controllers/admin/adminAutController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../middlewares/chekRoleMiddleware.js";
import AdminShopController from "../controllers/admin/adminShopController.js";
import AdminVehicleController from "../controllers/admin/adminVehicleController.js";
import AdminUserController from "../controllers/admin/adminUserController.js";

const adminRouter = express.Router();


// 1:===============admin auth routes==================
adminRouter.post("/register-admin", AdminAuthController.registerAdmin);
adminRouter.post("/change-password", authMiddleware, checkRoleMiddleware(["admin"]), AdminAuthController.changePassword)



// 2: ===========admin shop routes =====================

// D: get all shops
adminRouter.get("/shop/get-shops",
    authMiddleware,checkRoleMiddleware(['admin']),
    AdminShopController.getAllShops)

adminRouter.get("/shop/get-shops/:shopId",
      authMiddleware, checkRoleMiddleware(["admin"]),
    AdminShopController.getSingleShop
)

adminRouter.put("/shop/update-shop-status/:shopId",
    authMiddleware,checkRoleMiddleware(['admin']),
    AdminShopController.updateShopStatus
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




// 4: ==============admin routes for users=============

adminRouter.get("/user/get-users",
    authMiddleware,checkRoleMiddleware(['admin']),
    AdminUserController.getAllUsers);


adminRouter.get("/user/get-users/:userId",
    authMiddleware,checkRoleMiddleware(['admin']),
    AdminUserController.getSingleUser);

adminRouter.put("/user/update-user/:userId",
    authMiddleware,checkRoleMiddleware(['admin']),
    AdminUserController.updateUser
)
export default adminRouter;