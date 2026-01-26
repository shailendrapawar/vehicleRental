import express from "express";
import UserController from "./user.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../../middlewares/checkRoleMiddleware.js";

const userRouter = express.Router();

userRouter.get("/:id",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner', 'customer']),
    UserController.get
)

userRouter.get("/",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner', 'customer']),
    UserController.search)

// userRouter.post("/",
//     authMiddleware,
//     checkRoleMiddleware(['admin', 'owner']),
//     UserController.create)

userRouter.put("/:id",
    authMiddleware,
    checkRoleMiddleware(['admin', 'owner', 'customer']),
    UserController.update
)

export default userRouter
