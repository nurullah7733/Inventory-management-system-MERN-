const createService = async (Request, DataModel) => {
  let reqBody = Request.body;
  reqBody.userEmail = Request.headers.email;

  try {
    let createdData = await DataModel.create(reqBody);
    return { status: "success", data: createdData };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = createService;
