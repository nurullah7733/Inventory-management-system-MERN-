const createToken = require("../../utility/createToken");

const userLoginService = async (Request, DataModel) => {
  let reqBody = Request.body;
  try {
    let data = await DataModel.aggregate([
      { $match: reqBody },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
        },
      },
    ]);

    if (data.length > 0) {
      let token = await createToken(data[0].email);
      return { status: "success", token: token, data: data };
    } else {
      return { status: "unauthorized" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = userLoginService;
