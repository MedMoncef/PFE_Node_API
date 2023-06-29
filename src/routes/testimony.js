import express from "express";
const router = express.Router();
import { createTestimony, getAllTestimonies, updateTestimony, deleteTestimony, getTestimonyById } from '../controllers/testimonies';

router.post("/create_testimony", createTestimony);
router.get("/testimonies", getAllTestimonies);
router.put("/update_testimony/:id", updateTestimony);
router.get('/testimonies/:id', getTestimonyById);
router.delete("/delete_testimony/:id", deleteTestimony);

export default router;