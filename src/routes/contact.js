import express from "express";
const router = express.Router();
import { createContact, getAllContacts, getContactById, updateContact, deleteContact } from '../controllers/contacts';

router.post('/contacts', createContact);
router.get('/contacts', getAllContacts);
router.put('/contacts/:id', updateContact);
router.get('/contacts/:id', getContactById);
router.delete('/contacts/:id', deleteContact);

export default router;