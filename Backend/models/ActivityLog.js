const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Identifica l'azienda
  userEmail: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);