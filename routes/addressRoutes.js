const express = require('express');
const {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require('../controllers/AddressController');
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure token-based authentication
const router = express.Router();

// Create a new address for the logged-in user
router.post('/', authMiddleware, createAddress);

// Get all addresses for the logged-in user
router.get('/', authMiddleware, getAllAddresses);

// Get a single address by ID for the logged-in user
router.get('/:id', authMiddleware, getAddressById);

// Update an address by ID for the logged-in user
router.put('/:id', authMiddleware, updateAddress);

// Delete an address by ID for the logged-in user
router.delete('/:id', authMiddleware, deleteAddress);

module.exports = router;
