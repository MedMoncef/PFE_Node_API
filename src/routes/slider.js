import express from 'express';
const router = express.Router();
import { createSlider, getAllSliders, getSliderById, updateSlider, deleteSlider } from '../controllers/sliders';

router.post('/sliders', createSlider);
router.get('/sliders', getAllSliders);
router.get('/sliders/:id', getSliderById);
router.patch('/sliders/:id', updateSlider);
router.delete('/sliders/:id', deleteSlider);

export default router;