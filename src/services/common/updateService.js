const updateService = async (Request, DataModel) => {
  let userEmail = Request.headers.email;
  let id = Request.params.id;
  let reqBody = Request.body;

  try {
    let data = await DataModel.updateOne(
      { _id: id, userEmail: userEmail },
      reqBody
    );

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = updateService;
