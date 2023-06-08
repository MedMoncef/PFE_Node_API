import express from 'express';
import { createRoomType, getAllRoomTypes, updateRoomType, deleteRoomType } from '../controllers/roomTypes';

const router = express.Router();

router.post('/roomTypes', createRoomType);
router.get('/roomTypes', getAllRoomTypes);
router.put('/roomTypes/:id', updateRoomType);
router.delete('/roomTypes/:id', deleteRoomType);

export default router;