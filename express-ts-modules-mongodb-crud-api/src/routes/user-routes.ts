import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserByID, userUpdate } from "../controllers/user-controller";

const route = Router();

route.post('/create', createUser);
route.get('/getAll', getAllUsers );
route.get('/get/:id', getUserByID);
route.put('/update/:id', userUpdate);
route.delete("/deleteUser/:id", deleteUser);

export default route;