import express from "express";
const router = express.Router();
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/events';

router.post("/create_event", createEvent);
router.get("/event", getAllEvents);
router.put("/update_event/:id", updateEvent);
router.get('/events/:id', getEventById);
router.delete("/delete_event/:id", deleteEvent);

export default router;