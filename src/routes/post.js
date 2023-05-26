import express from "express";
const router = express.Router();
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controllers/posts';

router.post("/create_post", createPost);
router.get("/post", getAllPosts);
router.put("/update_post/:id", updatePost);
router.get('/posts/:id', getPostById);
router.delete("/delete_post/:id", deletePost);

export default router;