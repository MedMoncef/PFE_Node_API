import express from "express";
const router = express.Router();
import { createUser, getAllUser, getUserById, updateUser, deleteUser } from '../controllers/users';

router.post("/create_user", createUser);
router.get("/user", getAllUser);
router.put("/update_user/:id", updateUser);
router.get('/users/:id', getUserById);
router.delete("/delete_user/:id", deleteUser);

export default router;