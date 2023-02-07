const dropDownList = async (Request, DataModel, projection) => {
  let userEmail = Request.headers.email;
  try {
    let data = await DataModel.aggregate([
      { $match: { userEmail: userEmail } },
      { $project: projection },
    ]);
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = dropDownList;
