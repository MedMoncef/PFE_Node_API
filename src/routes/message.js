import express from 'express';
const router = express.Router();
import { createMessage, getAllMessages, updateMessage, deleteMessage, getMessagesBetweenUsers } from '../controllers/messages';

router.post('/messages', createMessage);
router.get('/messages', getAllMessages);
router.get('/messages/:userID/:otherUserID', getMessagesBetweenUsers);
router.put('/messages/:id', updateMessage);
router.delete('/messages/:id', deleteMessage);

export default router;