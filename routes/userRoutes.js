const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// Get all users (accessible by Admin and Super Admin)
router.get('/', authMiddleware, roleMiddleware(['Admin', 'Super Admin', "User"]), getAllUsers);

// Get a single user by ID (accessible by Admin and Super Admin)
router.get('/:id', authMiddleware, roleMiddleware(['Admin', 'Super Admin']), getUserById);

// Update a user (accessible by Admin and Super Admin)
router.put('/:id', authMiddleware, roleMiddleware(['Admin', 'Super Admin']), updateUser);

// Delete a user (accessible by Super Admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['Super Admin']), deleteUser);

module.exports = router;
