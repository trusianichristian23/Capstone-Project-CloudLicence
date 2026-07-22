 const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  softwareName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  cost: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  billingCycle: { 
    type: String, 
    required: true, 
    enum: ['monthly', 'yearly'], 
    default: 'monthly' 
  },
  seatsTotal: { 
    type: Number, 
    required: true, 
    default: 1 
  },
  assignedEmployees: { 
    type: [String], 
    default: [] 
  },
  status: { 
    type: String, 
    enum: ['active', 'expired', 'suspended'], 
    default: 'active' 
  },
  expiresAt: { 
    type: Date, 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('License', LicenseSchema);