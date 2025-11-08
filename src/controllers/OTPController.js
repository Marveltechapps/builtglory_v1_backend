const User = require("../models/User");
const config = require("../config.json");
const axios = require("axios");
const generateToken = require("../auths/generateToken");

// 🔹 Generate 6-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
}

// 🔹 SEND OTP
async function sendOTP(req, res) {
  let { mobileNumber } = req.body;

  try {
    mobileNumber = mobileNumber.trim();

    if (!/^\d{10}$/.test(mobileNumber) || /^0{10}$/.test(mobileNumber)) {
      return res.status(400).json({ error: "Invalid mobile number format" });
    }

    let user = await User.findOne({ mobileNumber });

    if (!user) {
      user = new User({ mobileNumber, isVerified: false });
      await user.save();
    }

    const testMobileNumber = "9698790921";
    const testOTP = "879056"; // 4-digit test OTP

    const otp = mobileNumber === testMobileNumber ? testOTP : generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    const smsApiUrl = `${config.smsvendor}to_mobileno=${mobileNumber}&sms_text=Dear Applicant, Your OTP for Mobile No. Verification is ${otp} . MJPTBCWREIS - EVOLGN`;

    try {
      const response = await axios.get(smsApiUrl);
      if (!response.data || response.data.status !== "success") {
        return res.status(500).json({ error: "Failed to send OTP via SMS" });
      }
    } catch (smsError) {
      return res.status(500).json({
        error: "SMS sending failed",
        details: smsError.response?.data || smsError.message
      });
    }

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    user.isVerified = false;
    await user.save();

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
}

// 🔹 VERIFY OTP & RETURN JWT
async function verifyOTP(req, res) {
  const { mobileNumber, enteredOTP } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (String(user.otp).trim() === String(enteredOTP).trim()) {
      // Check if user.name is present and not empty
      const hasValidName = user.name && user.name.trim().length > 0;

      user.isVerified = hasValidName ? true : false;
      user.otp = null;
      await user.save();

      const token = generateToken(user); // Assumes this function is defined

      return res.status(200).json({
        message: "OTP verified successfully",
        userId: user._id,
        token,
        isVerified: user.isVerified,
        name: user.name || null
      });
    } else {
      return res.status(400).json({ message: "Incorrect OTP" });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
}

// 🔹 RESEND OTP
async function resendOTP(req, res) {
  const { mobileNumber } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    const smsApiUrl = `${config.smsvendor}to_mobileno=${mobileNumber}&sms_text=Dear Applicant, Your OTP for Mobile No. Verification is ${otp} . MJPTBCWREIS - EVOLGN`;

    await axios.get(smsApiUrl);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ error: "Failed to resend OTP" });
  }
}

// 🔹 Get user by mobile number
async function getUserByPhone(req, res) {
  try {
    const { mobileNumber } = req.params;
    const user = await User.findOne({ mobileNumber });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.send({
      status: 200,
      message: "User fetched by MobileNumber",
      data: user
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Failed to fetch User by MobileNumber",
      error: "Internal Server Error"
    });
  }
}

// 🔹 Delete user by mobile number
async function deleteUserByPhone(req, res) {
  try {
    const { mobileNumber } = req.params;
    const user = await User.findOneAndDelete({ mobileNumber });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.send({
      status: 200,
      message: "User Deleted by MobileNumber",
      data: user
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Failed to delete User MobileNumber",
      error: "Internal Server Error"
    });
  }
}

module.exports = {
  sendOTP,
  verifyOTP,
  resendOTP,
  getUserByPhone,
  deleteUserByPhone
};
