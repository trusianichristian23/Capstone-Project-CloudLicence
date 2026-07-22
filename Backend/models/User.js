const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  companyId: { type: mongoose.Schema.Types.ObjectId, default: null },
  notificationDays: { type: Number, default: 7 } 
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);