const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Rotte base
router.get('/', protect, adminOnly, userController.getAllUsers);
// Aggiungi questa riga:
router.post('/create', protect, adminOnly, userController.createUser);

// Rotte specifiche (prima di quelle dinamiche con :id)
router.put('/settings', protect, userController.updateSettings);
router.put('/update-profile', protect, userController.updateProfile);

// Rotta dinamica (va messa dopo le rotte specifiche)
router.put('/:id/role', protect, adminOnly, userController.updateUserRole);

module.exports = router;