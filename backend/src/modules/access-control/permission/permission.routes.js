import express from "express";
import PermissionController from "./permission.controller.js";

import authMiddleware from "../../../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../../../middlewares/checkRoleMiddleware.js";

const permissionRouter = express.Router();

permissionRouter.get("/:id",
    authMiddleware,
    checkRoleMiddleware(['admin']),
    PermissionController.get
)

permissionRouter.get("/",
    authMiddleware,
    checkRoleMiddleware(['admin']),
    PermissionController.search)

permissionRouter.post("/",
    authMiddleware,
    checkRoleMiddleware(['admin']),
    PermissionController.create)

permissionRouter.put("/:id",
    authMiddleware,
    checkRoleMiddleware(['admin']),
    PermissionController.update
)
export default permissionRouter