const userCreateService = async (Request, DataModel) => {
  let reqBody = Request.body;
  try {
    let data = await DataModel.create(reqBody);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = userCreateService;
