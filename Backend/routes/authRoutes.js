const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Percorso: POST /api/auth/register
router.post('/register', authController.register);

// Percorso: POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;