import express from "express";
const router = express.Router();
import { createPayment, getAllPayments, updatePayment, deletePayment, getPaymentById } from '../controllers/payments';

router.post("/create_payment", createPayment);
router.get("/payments", getAllPayments);
router.put("/update_payment/:id", updatePayment);
router.get('/payments/:id', getPaymentById);
router.delete("/delete_payment/:id", deletePayment);

export default router;