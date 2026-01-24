import express from "express";
import RoleController from "./role.controller.js";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../../../middlewares/checkRoleMiddleware.js";

const roleRouter = express.Router();

// Get single role by ID or key
roleRouter.get("/:id",
    authMiddleware,
    checkRoleMiddleware(['admin']),
    RoleController.get
)

// Search/List roles
roleRouter.get("/",
    authMiddleware,
    checkRoleMiddleware(['admin']),
    RoleController.search)

// Create new role
roleRouter.post("/",
    authMiddleware,
    checkRoleMiddleware(['admin']),
    RoleController.create)

// Update role
roleRouter.put("/:id",
    authMiddleware,
    checkRoleMiddleware(['admin']),
    RoleController.update
)


export default roleRouter
