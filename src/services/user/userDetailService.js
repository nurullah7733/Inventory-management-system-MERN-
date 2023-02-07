const userDetailService = async (Request, DataModel) => {
  try {
    let data = await DataModel.aggregate([
      { $match: { email: Request.headers.email } },
    ]);

    if (data.length > 0) {
      return { status: "success", data };
    } else {
      return { status: "fail", data: "unauthorized" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = userDetailService;
