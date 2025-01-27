const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  isoCode: { type: String, required: true, unique: true }, // For ISO 3166 codes
});

module.exports = mongoose.model('Country', CountrySchema);
