import express from "express";
const router = express.Router();
import { createUser, getAllUser, getUserById, updateUser, deleteUser, loginUser } from '../controllers/users';

router.post("/create_user", createUser);
router.get("/users", getAllUser);
router.patch("/users/:id", updateUser);
router.get('/users/:id', getUserById);
router.delete("/delete_user/:id", deleteUser);
router.post("/loginUser", loginUser);

export default router;