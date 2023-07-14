import express from "express";
const router = express.Router();
import { getAllTimeTable, deleteTimeTable, getTimeTableById, updateTimeTable } from '../controllers/timeTables';


router.get('/timetables/get/:_id', getTimeTableById);
router.put('/timetables/:id', updateTimeTable);
router.get('/timetables', getAllTimeTable);
router.delete('/timetables/delete/:id', deleteTimeTable);

export default router;