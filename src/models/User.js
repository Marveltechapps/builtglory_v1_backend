const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Invalid mobile number format"]
    },
    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    name: {
      type: String,
      default: ""
    },
    otp: {
      type: String,
      default: null
    },
    otpExpiry: {
      type: Date,
      default: null
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    profileImage: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt automatically
  }
);

// Always update updatedAt before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("UserModel", userSchema);
