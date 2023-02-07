const userResetPasswordService = async (
  Request,
  DataModelUser,
  DataModelOtp
) => {
  let email = Request.body.email;
  let otp = Request.body.otpCode;
  let password = Request.body.password;
  let statusCode = 1;

  try {
    let data = await DataModelOtp.aggregate([
      { $match: { email: email, otp: otp, status: statusCode } },
    ]);
    if (data.length > 0) {
      let updateUser = await DataModelUser.updateOne(
        { email: email },
        { password: password }
      );
      return { status: "success", data: updateUser };
    } else {
      return { status: "fail", data: "Otp code not match. try again." };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = userResetPasswordService;
