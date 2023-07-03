import express from 'express';
const router = express.Router();
import { createMenu, getAllMenus, getMenuById, updateMenu, deleteMenu } from '../controllers/menus';

router.post('/menus', createMenu);
router.get('/menus', getAllMenus);
router.get('/menus/:id', getMenuById);
router.patch('/menus/:id', updateMenu);
router.delete('/menus/:id', deleteMenu);

export default router;