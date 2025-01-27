const Country = require('../models/Country');
const State = require('../models/State');
const City = require('../models/City');
const Pincode = require('../models/Pincode');

// Get all countries
exports.getCountries = async (req, res) => {
  try {
    const { searchKey } = req.query;
    const filter = searchKey
      ? { name: { $regex: searchKey, $options: 'i' } }
      : {};

    const countries = await Country.find(filter);
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching countries', error: err.message });
  }
};

// Get all states by countryId
exports.getStatesByCountryId = async (req, res) => {
  try {
    const { countryId } = req.params;
    const { searchKey } = req.query;

    const filter = { countryId };
    if (searchKey) filter.name = { $regex: searchKey, $options: 'i' };

    const states = await State.find(filter);
    res.status(200).json(states);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching states', error: err.message });
  }
};

// Get all cities by stateId
exports.getCitiesByStateId = async (req, res) => {
  try {
    const { stateId } = req.params;
    const { searchKey } = req.query;

    const filter = { stateId };
    if (searchKey) filter.name = { $regex: searchKey, $options: 'i' };

    const cities = await City.find(filter);
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cities', error: err.message });
  }
};

// Get all pincodes by cityId
exports.getPincodesByCityId = async (req, res) => {
  try {
    const { cityId } = req.params;
    const { searchKey } = req.query;

    const filter = { cityId };
    if (searchKey) filter.code = { $regex: searchKey, $options: 'i' };

    const pincodes = await Pincode.find(filter);
    res.status(200).json(pincodes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pincodes', error: err.message });
  }
};
