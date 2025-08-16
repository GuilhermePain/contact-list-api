import { Router } from 'express';
import contactController from '../controllers/contact.controller.js';
import { verifyAuth } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { contactSchema, updateContactSchema } from '../validators/contact/index.js';

const router = Router();

router.get('/', verifyAuth, contactController.getAllContactsByUserId);
router.post('/', verifyAuth, validate(contactSchema), contactController.createContact);
router.patch('/:id', verifyAuth, validate(updateContactSchema), contactController.updateContact);
router.delete('/:id', verifyAuth, contactController.deletedContact);

export default router;
