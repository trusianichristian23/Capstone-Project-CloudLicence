 const License = require('../models/License');
const ActivityLog = require('../models/ActivityLog');

exports.createLicense = async (req, res) => {
    try {
        const licenseData = { 
            ...req.body, 
            user: req.user.id, 
            companyId: req.user.companyId, 
            expiresAt: new Date(req.body.expiresAt) 
        };
        const newLicense = await new License(licenseData).save();
        
        await ActivityLog.create({ 
            companyId: req.user.companyId, 
            userEmail: req.user.email, 
            action: `Creata licenza: ${req.body.softwareName}` 
        });
        res.status(201).json(newLicense);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getUserLicenses = async (req, res) => {
    try {
        // CORRETTO: Filtriamo sempre per companyId
        const query = req.user.role === 'admin' 
            ? { companyId: req.user.companyId } 
            : { user: req.user.id, companyId: req.user.companyId };
        const licenses = await License.find(query);
        res.json(licenses);
    } catch (err) { res.status(500).json({ error: "Errore nel recupero licenze" }); }
};

exports.updateLicense = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (updateData.expiresAt) updateData.expiresAt = new Date(updateData.expiresAt);
        // Aggiunto filtro per sicurezza (l'utente può modificare solo licenze della sua azienda)
        const updated = await License.findOneAndUpdate(
            { _id: req.params.id, companyId: req.user.companyId }, 
            { $set: updateData }, 
            { new: true }
        );
        
        await ActivityLog.create({ 
            companyId: req.user.companyId, 
            userEmail: req.user.email, 
            action: `Modificata licenza: ${updated.softwareName}` 
        });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: "Errore nell'aggiornamento" }); }
};

exports.deleteLicense = async (req, res) => {
    try {
        const lic = await License.findOneAndDelete({ _id: req.params.id, companyId: req.user.companyId });
        const name = lic ? lic.softwareName : "Sconosciuto";
        
        await ActivityLog.create({ 
            companyId: req.user.companyId, 
            userEmail: req.user.email, 
            action: `Eliminata licenza: ${name}` 
        });
        res.json({ msg: "Licenza eliminata" });
    } catch (err) { res.status(500).json({ error: "Errore nell'eliminazione" }); }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const query = req.user.role === 'admin' ? { companyId: req.user.companyId } : { user: req.user.id, companyId: req.user.companyId };
        const allLicenses = await License.find(query);
        const now = new Date();
        const active = allLicenses.filter(l => l.status === 'active' && new Date(l.expiresAt) > now);
        res.json({ totalMonthly: active.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0), activeLicenses: active.length, totalLicenses: allLicenses.length });
    } catch (err) { res.status(500).json({ error: "Errore statistiche" }); }
};

exports.getExpiringLicenses = async (req, res) => {
    try {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + 7);
        const query = req.user.role === 'admin' 
            ? { companyId: req.user.companyId, status: 'active', expiresAt: { $gte: today, $lte: futureDate } } 
            : { user: req.user.id, companyId: req.user.companyId, status: 'active', expiresAt: { $gte: today, $lte: futureDate } };
        const expiring = await License.find(query);
        res.json(expiring);
    } catch (err) { res.status(500).json({ error: "Errore notifiche" }); }
};

exports.getAnalytics = async (req, res) => {
    try {
        const query = req.user.role === 'admin' ? { companyId: req.user.companyId } : { user: req.user.id, companyId: req.user.companyId };
        const allLicenses = await License.find(query);
        const now = new Date();
        const categoryMap = allLicenses.reduce((acc, l) => { const cat = l.category || "Altro"; const cost = Number(l.cost) || 0; acc[cat] = (acc[cat] || 0) + cost; return acc; }, {});
        const departmentCosts = Object.keys(categoryMap).map(cat => ({ _id: cat, totalCost: categoryMap[cat] }));
        const active = allLicenses.filter(l => l.status === 'active' && new Date(l.expiresAt) > now);
        res.json({ departmentCosts, usageStats: [{ name: 'Licenze', used: active.length, unused: allLicenses.length - active.length }] });
    } catch (err) { res.status(500).json({ error: "Errore analisi" }); }
};