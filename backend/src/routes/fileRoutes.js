import express from "express"
import FileController from "../controllers/FileController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware.js";

import FileController from "../controllers/FileController.js";

const fileRouter = express.Router()

fileRouter.get("/get-files/:id",
    authMiddleware,
    checkRoleMiddleware(["admin", "owner", "customer"]),
    FileController.get
);

fileRouter.get("/get-files",
    authMiddleware,
    checkRoleMiddleware(["admin", "owner", "customer"]),
    FileController.search
)

fileRouter.post("/create-files",
    authMiddleware,
    checkRoleMiddleware(["admin", "owner"]),
    FileController.create
)

fileRouter.put("/update-files/:id",
    authMiddleware,
    checkRoleMiddleware(["admin", "owner"]),
    FileController.update
)


