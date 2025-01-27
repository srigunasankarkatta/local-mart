const mongoose = require('mongoose');

const PincodeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
});

module.exports = mongoose.model('Pincode', PincodeSchema);
