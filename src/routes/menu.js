import express from 'express';
const router = express.Router();
import { createMenu, getAllMenus, updateMenu, deleteMenu } from '../controllers/menus';

router.post('/menus', createMenu);
router.get('/menus', getAllMenus);
router.put('/menus/:id', updateMenu);
router.delete('/menus/:id', deleteMenu);

export default router;