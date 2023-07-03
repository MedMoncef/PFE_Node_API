import express from "express";
const router = express.Router();
import { createTestimony, getAllTestimonies, updateTestimony, deleteTestimony, getTestimonyById } from '../controllers/testimonies';

router.post("/testimonies", createTestimony);
router.get("/testimonies", getAllTestimonies);
router.patch("/testimonies/:id", updateTestimony);
router.get('/testimonies/:id', getTestimonyById);
router.delete("/testimonies/:id", deleteTestimony);

export default router;