const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    email: { type: String },
    otp: String,
    status: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

const OtpModel = mongoose.model("otps", otpSchema);
module.exports = OtpModel;
