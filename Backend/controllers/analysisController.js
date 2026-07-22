const License = require('../models/License');

exports.getAnalytics = async (req, res) => {
    try {
        // 1. Aggregazione: Costi totali per dipartimento
        const departmentCosts = await License.aggregate([
            { $group: { _id: "$department", totalCost: { $sum: "$cost" } } }
        ]);

        // 2.Dati di utilizzo
        const usageStats = [
            { name: 'Adobe CC', used: 85, unused: 15 },
            { name: 'GitHub Copilot', used: 95, unused: 5 },
            { name: 'Slack', used: 40, unused: 60 }
        ];

        res.json({ departmentCosts, usageStats });
    } catch (err) {
        res.status(500).json({ error: "Errore nel calcolo delle analisi" });
    }
};