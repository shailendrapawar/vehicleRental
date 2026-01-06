import express from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';
const userRouter = express.Router();



userRouter.get('/get-users',
    authMiddleware,
    checkRoleMiddleware(['admin']),
    UserController.getUsers
);
userRouter.get('/get-user/:userId',
    authMiddleware,
    checkRoleMiddleware(['admin','user','owner']),
    UserController.getUser
);

userRouter.put('/update-user/:userId',
    authMiddleware,
    checkRoleMiddleware(['admin', 'user']),
    UserController.updateUser
);


export default userRouter;
