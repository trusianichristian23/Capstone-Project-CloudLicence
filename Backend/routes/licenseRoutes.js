const express = require('express');
const router = express.Router();
const licenseController = require('../controllers/licenseController');
const { protect } = require('../middleware/authMiddleware');
const ActivityLog = require('../models/ActivityLog');

router.post('/add', protect, licenseController.createLicense); 
router.get('/my-licenses', protect, licenseController.getUserLicenses);
router.get('/expiring', protect, licenseController.getExpiringLicenses);
router.get('/stats', protect, licenseController.getDashboardStats);
router.get('/analysis', protect, licenseController.getAnalytics);
router.delete('/:id', protect, licenseController.deleteLicense);
router.put('/:id', protect, licenseController.updateLicense);

router.get('/logs', protect, async (req, res) => {
    try {
        // L'admin vede i log della sua intera azienda, l'user vede solo i propri log (filtrati per email o ID)
        const filter = req.user.role === 'admin' 
            ? { companyId: req.user.companyId } 
            : { userEmail: req.user.email };

        const logs = await ActivityLog.find(filter).sort({ timestamp: -1 });
        res.json(logs);
    } catch (err) { res.status(500).json({ error: "Errore recupero log" }); }
});

module.exports = router;