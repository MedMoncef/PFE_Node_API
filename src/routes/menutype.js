import express from 'express';
import { createMenuType, getAllMenuTypes, updateMenuType, deleteMenuType } from '../controllers/menuTypes';

const router = express.Router();

router.post('/menuTypes', createMenuType);
router.get('/menuTypes', getAllMenuTypes);
router.put('/menuTypes/:id', updateMenuType);
router.delete('/menuTypes/:id', deleteMenuType);

export default router;