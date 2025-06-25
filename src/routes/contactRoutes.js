import { Router } from 'express';
import contactController from '../controllers/contactController.js';
import { verifyAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyAuth, contactController.getAllContacts);
router.post('/', verifyAuth, contactController.createContact);
router.patch('/:id', verifyAuth, contactController.updateContact);
router.delete('/:id', verifyAuth, contactController.deletedContact);

export default router;
