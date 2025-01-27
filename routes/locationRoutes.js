const express = require('express');
const {
  getCountries,
  getStatesByCountryId,
  getCitiesByStateId,
  getPincodesByCityId,
} = require('../controllers/LocationController');
const router = express.Router();

// Get all countries
router.get('/countries', getCountries);

// Get all states by countryId
router.get('/countries/:countryId/states', getStatesByCountryId);

// Get all cities by stateId
router.get('/states/:stateId/cities', getCitiesByStateId);

// Get all pincodes by cityId
router.get('/cities/:cityId/pincodes', getPincodesByCityId);

module.exports = router;
