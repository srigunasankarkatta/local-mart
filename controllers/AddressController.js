const Address = require("../models/Address");
const AddressType = require("../models/AddressType"); // Import AddressType model
const jwtService = require("../services/jwtService");

// Create a new address for the logged-in user
exports.createAddress = async (req, res) => {
  try {
    const { addressType, description, countryId, stateId, cityId, pincodeId } = req.body;

    // Get user ID from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized: Token not provided" });

    const decoded = jwtService.verifyToken(token);
    const userId = decoded.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized: Invalid token" });

    // Create a new address
    const address = new Address({
      userId,
      addressType,
      description,
      countryId,
      stateId,
      cityId,
      pincodeId,
    });

    await address.save();
    res.status(201).json({ message: "Address created successfully", address });
  } catch (err) {
    res.status(500).json({ message: "Error creating address", error: err.message });
  }
};

// Get all addresses for the logged-in user
exports.getAllAddresses = async (req, res) => {
  try {
    // Get user ID from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized: Token not provided" });

    const decoded = jwtService.verifyToken(token);
    const userId = decoded.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized: Invalid token" });

    // Fetch all addresses for the user
    const addresses = await Address.find({ userId })
      .populate("addressType")
      .populate("countryId")
      .populate("stateId")
      .populate("cityId")
      .populate("pincodeId");

    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching addresses", error: err.message });
  }
};

// Get a single address by ID for the logged-in user
exports.getAddressById = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized: Token not provided" });

    const decoded = jwtService.verifyToken(token);
    const userId = decoded.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized: Invalid token" });

    const address = await Address.findOne({ _id: req.params.id, userId })
      .populate("addressType")
      .populate("countryId")
      .populate("stateId")
      .populate("cityId")
      .populate("pincodeId");

    if (!address) return res.status(404).json({ message: "Address not found" });

    res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ message: "Error fetching address", error: err.message });
  }
};

// Update an address by ID for the logged-in user
exports.updateAddress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized: Token not provided" });

    const decoded = jwtService.verifyToken(token);
    const userId = decoded.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized: Invalid token" });

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );

    if (!updatedAddress) return res.status(404).json({ message: "Address not found" });

    res.status(200).json({ message: "Address updated successfully", updatedAddress });
  } catch (err) {
    res.status(500).json({ message: "Error updating address", error: err.message });
  }
};

// Delete an address by ID for the logged-in user
exports.deleteAddress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized: Token not provided" });

    const decoded = jwtService.verifyToken(token);
    const userId = decoded.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized: Invalid token" });

    const deletedAddress = await Address.findOneAndDelete({ _id: req.params.id, userId });

    if (!deletedAddress) return res.status(404).json({ message: "Address not found" });

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting address", error: err.message });
  }
};
