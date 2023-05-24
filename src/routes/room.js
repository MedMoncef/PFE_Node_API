import express from 'express';
import { createRoom, getAllRooms, updateRoom, deleteRoom } from '../controllers/rooms';

const router = express.Router();

router.post('/rooms', createRoom);
router.get('/rooms', getAllRooms);
router.put('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);

export default router;