const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// router.get('/contacts');
router.post('/contacts', contactController.createContact);
// router.patch('/contacts/:id');
// router.delete('/contacts/:id');

module.exports = router;
