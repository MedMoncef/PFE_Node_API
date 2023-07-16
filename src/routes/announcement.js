import express from "express";
const router = express.Router();
import { getAllAnnouncements, createAnnouncement, updateAnnouncement, getAnnouncementById, deleteAnnouncement } from '../controllers/announcements';

router.post('/announcements', createAnnouncement);
router.get('/announcements', getAllAnnouncements);
router.patch('/announcements/:id', updateAnnouncement);
router.get('/announcements/:id', getAnnouncementById);
router.delete('/announcements/:id', deleteAnnouncement);

export default router;