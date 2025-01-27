const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
});

module.exports = mongoose.model('State', StateSchema);
