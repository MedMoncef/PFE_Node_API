import express from 'express';
const router = express.Router();
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogs';

router.post('/blogs', createBlog);
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

export default router;