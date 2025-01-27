const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");

// Generate a 6-digit OTP
exports.generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Example: "123456"
};

// Save OTP to the database
exports.saveOtp = async ({ email, mobileNumber, otp }) => {
  try {
    // Remove any existing OTP for the user (to avoid duplicates)
    await Otp.deleteMany({ $or: [{ email }, { mobileNumber }] });

    // Save the new OTP
    const otpEntry = new Otp({ email, mobileNumber, otp });
    await otpEntry.save();
  } catch (err) {
    console.error("Error saving OTP:", err.message);
    throw new Error("Failed to save OTP");
  }
};

// Send OTP (via Email or SMS)
exports.sendOtp = async (recipient, otp) => {
  try {
    if (isEmail(recipient)) {
      // Send OTP via Email
      await sendEmail(recipient, otp);
    } else {
      // Simulate sending OTP via SMS
      console.log(`Sending OTP "${otp}" to mobile number "${recipient}"`);
    }
  } catch (err) {
    console.error("Error sending OTP:", err.message);
    throw new Error("Failed to send OTP");
  }
};

// Verify OTP
exports.verifyOtp = async ({ email, mobileNumber, otp }) => {
  try {
    const otpEntry = await Otp.findOne({ $or: [{ email }, { mobileNumber }] });

    if (!otpEntry) return false; // OTP not found
    if (otpEntry.otp !== otp) return false; // OTP mismatch

    // OTP is valid, remove it from the database
    await Otp.deleteMany({ $or: [{ email }, { mobileNumber }] });
    return true;
  } catch (err) {
    console.error("Error verifying OTP:", err.message);
    return false;
  }
};

// Helper: Check if the recipient is an email
const isEmail = (recipient) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient);
};

// Helper: Send Email
const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider
    auth: {
      user: "web.devork@gmail.com", // Replace with your email
      pass: "rufw vmls ptta ezzi", // Replace with your email password
    },
  });

  const mailOptions = {
    from: "local-mart@services.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`OTP sent to email: ${email}`);
};
