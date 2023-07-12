import express from 'express';
const router = express.Router();
import { getMessagesRelatedToUser, createMessage, getAllMessages, updateMessage, deleteMessage, getMessagesBetweenUsers, deleteMessagesBetweenUsers, getMessageById_Post, getGroupMessagesByPost } from '../controllers/messages';

router.post('/messages', createMessage);
router.get('/messages', getAllMessages);
router.get('/messages/:userID/:otherUserID', getMessagesBetweenUsers);
router.delete('/messages/:userID/:otherUserID', deleteMessagesBetweenUsers);
router.get('/messages/:ID_PostSent', getMessageById_Post);
router.get('/groupMessages/:ID_PostSent', getGroupMessagesByPost);
router.put('/messages/:id', updateMessage);
router.delete('/messages/:id', deleteMessage);
router.get('/messagesNotifications/:userID/:ID_PostSent', getMessagesRelatedToUser);


export default router;