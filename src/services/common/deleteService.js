const deleteService = async (Request, dataModel) => {
  let deleteId = Request.params.id;
  let userEmail = Request.headers.email;

  let deleteObject = {};
  deleteObject._id = deleteId;
  deleteObject.userEmail = userEmail;

  try {
    let deleteResult = await dataModel.deleteMany(deleteObject);
    return { status: "success", data: deleteResult };
  } catch (error) {
    return { status: "success", data: error.toString() };
  }
};

module.exports = deleteService;
