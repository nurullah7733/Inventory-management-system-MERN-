const userCreateService = require("../../services/user/userCreateService");
const userDetailService = require("../../services/user/userDetailService");
const userLoginService = require("../../services/user/userLoginService");
const userResetPasswordService = require("../../services/user/userResetPasswordService");
const userUpdateService = require("../../services/user/userUpdateService");
const verifyEmailService = require("../../services/user/verifyEmailService");
const verifyOtp = require("../../services/user/verifyOtpService");

const UserModel = require("../../models/user/userModel");
const otpModel = require("../../models/user/otpModel");

// Registration
exports.Registration = async (req, res) => {
  let result = await userCreateService(req, UserModel);
  res.status(200).json(result);
};
// login
exports.Login = async (req, res) => {
  let result = await userLoginService(req, UserModel);
  res.status(200).json(result);
};
// user details
exports.UserDetails = async (req, res) => {
  let result = await userDetailService(req, UserModel);
  res.status(200).json(result);
};
// user Update
exports.UserUpdate = async (req, res) => {
  let result = await userUpdateService(req, UserModel);
  res.status(200).json(result);
};

// Reset User Password
// step 01
exports.UserEmailVerifyAndSendMail = async (req, res) => {
  let result = await verifyEmailService(req, UserModel, otpModel);
  res.status(200).json(result);
};
// step 02
exports.VerifyOTP = async (req, res) => {
  let result = await verifyOtp(req, otpModel);
  res.status(200).json(result);
};
// step 03
exports.CreateNewPassword = async (req, res) => {
  let result = await userResetPasswordService(req, UserModel, otpModel);
  res.status(200).json(result);
};
