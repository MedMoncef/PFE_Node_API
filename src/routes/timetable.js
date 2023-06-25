import express from "express";
const router = express.Router();
import { loginCheck } from '../controllers/timeTables';

// Route to handle user login
router.post('/loginCheck', loginCheck);

export default router;