import { Router } from "express";
import { createUser } from "../controllers/user-controllers";

const userRouter: Router = Router();

userRouter.post("/create", createUser);

export default userRouter;