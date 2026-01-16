import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserByID, login, userUpdate } from "../controllers/user-controllers";
import { verifyJWT } from "../middlewares/auth";
import { isAdmin } from "../middlewares/admin-auth";

const userRouter: Router = Router();

userRouter.post('/create', createUser);
userRouter.post('/login', login);
userRouter.get('/getAll', verifyJWT, isAdmin, getAllUsers );
userRouter.get('/get/:id', verifyJWT, isAdmin, getUserByID);
userRouter.put('/update/:id', verifyJWT, isAdmin, userUpdate);
userRouter.delete("/delete/:id", verifyJWT, isAdmin, deleteUser);

export default userRouter;