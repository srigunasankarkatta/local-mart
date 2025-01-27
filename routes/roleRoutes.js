const express = require('express');
const { createRole, getRoles } = require('../controllers/RoleController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// Create a new role (accessible by Super Admin only)
router.post('/', authMiddleware, roleMiddleware(['Super Admin']), createRole);

// Get all roles (accessible by Super Admin and Admin)
router.get('/', authMiddleware, roleMiddleware(['Super Admin', 'Admin']), getRoles);

module.exports = router;
