const mongoose = require("mongoose");

const getServiceById = async (Request, DataModel) => {
  let userEmail = Request.headers.email;
  let id = Request.params.id;
  let objectId = mongoose.Types.ObjectId;
  let query = {};
  query.userEmail = userEmail;
  query._id = objectId(id);
  try {
    let data = await DataModel.aggregate([{ $match: query }]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = getServiceById;
