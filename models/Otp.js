const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  email: { type: String },
  mobileNumber: { type: String },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // Expires after 5 minutes (300 seconds)
});

module.exports = mongoose.model('Otp', OtpSchema);
