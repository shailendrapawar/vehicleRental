import express from "express";
import ShopController from "./shop.contoller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../../middlewares/checkRoleMiddleware.js";

const shopRouter = express.Router();

shopRouter.get("/:id",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner', 'customer']),
    ShopController.get
)


shopRouter.get("/",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner', 'customer']),
    ShopController.search)

shopRouter.post("/",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner']),
    // upload.single("gstBill"),
    ShopController.create)


// shopRouter.put("/update-shop/:shopId",
//     authMiddleware,
//     checkRoleMiddleware(['owner', 'admin']),
//     ShopController.updateShop
// )
export default shopRouter