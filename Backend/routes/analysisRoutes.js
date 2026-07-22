const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, analysisController.getAnalytics);

module.exports = router;