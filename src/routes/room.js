import express from 'express';
import { createRoom, getAllRooms, updateRoom, deleteRoom, getRoomById } from '../controllers/rooms';

const router = express.Router();

router.post('/rooms', createRoom);
router.get('/rooms', getAllRooms);
router.patch('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);
router.get('/rooms/:id', getRoomById);

export default router;