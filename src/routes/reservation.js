import express from "express";
const router = express.Router();
import { createReservation, getAllReservations, getReservationById, updateReservation, deleteReservation } from '../controllers/reservations';

router.post("/create_reservation", createReservation);
router.get("/reservations", getAllReservations);
router.patch("/reservations/:id", updateReservation);
router.get('/reservations/:id', getReservationById);
router.delete("/reservations/:id", deleteReservation);

export default router;