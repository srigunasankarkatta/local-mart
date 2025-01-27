const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  addressType: { type: mongoose.Schema.Types.ObjectId, ref: 'AddressType', required: false },
  description: { type: String, required: true },
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
  stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  pincodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pincode' },
});

module.exports = mongoose.model('Address', AddressSchema);
