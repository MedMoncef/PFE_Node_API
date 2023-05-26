import express from "express";
const router = express.Router();
import { createReservation, getAllReservations, getReservationById, updateReservation, deleteReservation } from '../controllers/reservations';

router.post("/create_reservation", createReservation);
router.get("/reservation", getAllReservations);
router.put("/update_reservation/:id", updateReservation);
router.get('/reservations/:id', getReservationById);
router.delete("/delete_reservation/:id", deleteReservation);

export default router;