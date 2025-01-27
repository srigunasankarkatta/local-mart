const mongoose = require('mongoose');

const AddressTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model('AddressType', AddressTypeSchema);
