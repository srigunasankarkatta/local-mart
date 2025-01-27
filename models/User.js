const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobileNumber: { type: String, unique: true, required: true },
  password: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  dateOfBirth: { type: Date },
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
  stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  pincodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pincode' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
