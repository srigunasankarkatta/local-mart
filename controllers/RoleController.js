const Role = require('../models/Role');

exports.createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).json({ message: 'Role created successfully', role });
  } catch (err) {
    res.status(500).json({ message: 'Error creating role', error: err.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching roles', error: err.message });
  }
};
