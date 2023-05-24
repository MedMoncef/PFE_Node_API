import express from 'express';
const router = express.Router();
import { createSlider, getAllSliders, updateSlider, deleteSlider } from '../controllers/sliders';

router.post('/sliders', createSlider);
router.get('/sliders', getAllSliders);
router.put('/sliders/:id', updateSlider);
router.delete('/sliders/:id', deleteSlider);

export default router;