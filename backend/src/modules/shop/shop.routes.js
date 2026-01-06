import express from "express";
import ShopController from "./shop.contoller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../../middlewares/checkRoleMiddleware.js";

import upload from "../../middlewares/uploadMiddleware.js";
const shopRouter = express.Router();

shopRouter.get("/get-shops",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner', 'customer']),
    ShopController.getShops)

shopRouter.get("/get-shops/:keyword",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner', 'customer']),
    ShopController.getSingleShop
)

shopRouter.post("/create-shop",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner']),
    upload.single("gstBill"),
    ShopController.createShop)


shopRouter.put("/update-shop/:shopId",
    authMiddleware,
    checkRoleMiddleware(['owner', 'admin']),
    ShopController.updateShop
)
export default shopRouter