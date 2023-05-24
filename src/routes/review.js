import express from "express";
const router = express.Router();
import { createReview, getAllReviews, updateReview, deleteReview } from '../controllers/reviews';

router.post('/reviews', createReview);
router.get('/reviews', getAllReviews);
router.put('/reviews/:id', updateReview);
router.delete('/reviews/:id', deleteReview);

export default router;