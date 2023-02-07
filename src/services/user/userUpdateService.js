const userUpdateService = async (Request, DataModel) => {
  let email = Request.headers.email;

  let firstName = Request.body.firstName;
  let lastName = Request.body.lastName;
  let mobile = Request.body.mobile;
  let photo = Request.body.photo;

  try {
    let updateUser = await DataModel.updateOne(
      { email: email },
      {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        photo: photo,
      }
    );
    if (updateUser.modifiedCount === 1) {
      return { status: "success", data: updateUser };
    } else {
      return { status: "fail", data: "unauthorized" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = userUpdateService;
