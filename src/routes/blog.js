import express from 'express';
const router = express.Router();
import { createBlog, getAllBlogs, updateBlog, deleteBlog } from '../controllers/blogs';

router.post('/blogs', createBlog);
router.get('/blogs', getAllBlogs);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

export default router;