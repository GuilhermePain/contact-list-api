import { Router } from 'express';
import contactController from '../controllers/contactController.js';

const router = Router();

router.get('/', contactController.getAllContacts);
router.post('/', contactController.createContact);
router.patch('/:id', contactController.updateContact);
router.delete('/:id', contactController.deletedContact);

export default router;
