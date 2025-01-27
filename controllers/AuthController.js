const User = require("../models/User");
const otpService = require("../services/otpService");
const jwtService = require("../services/jwtService");

exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      role,
      countryId,
      stateId,
      cityId,
      pincodeId,
    } = req.body;

    const user = new User({
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      role,
      countryId,
      stateId,
      cityId,
      pincodeId,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};
exports.loginWithOTP = async (req, res) => {
  try {
    const { email, mobileNumber } = req.body;

    // Find user by email or mobile number
    const user = await User.findOne({
      $or: [{ email }, { mobileNumber }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate and save OTP
    const otp = otpService.generateOtp();
    await otpService.saveOtp({
      email: user.email,
      mobileNumber: user.mobileNumber,
      otp,
    });

    // Send OTP
    await otpService.sendOtp(email || mobileNumber, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, mobileNumber, otp } = req.body;

    // Verify OTP
    const isValid = await otpService.verifyOtp({ email, mobileNumber, otp });

    if (!isValid)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    // Generate JWT token
    // const token = jwtService.generateToken({ email, mobileNumber });

    // Fetch the user details to include the role in the JWT payload
    const user = await User.findOne({ $or: [{ email }, { mobileNumber }] });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate JWT token with role
    const token = jwtService.generateToken({
      id: user.id,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role,
    });

    res.status(200).json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: err.message });
  }
};
