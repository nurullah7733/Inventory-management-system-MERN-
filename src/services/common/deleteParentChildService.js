const mongoose = require("mongoose");

const DeleteParentChildService = async (
  Request,
  ParantModel,
  ChildModel,
  deleteChildIdName
) => {
  const session = await mongoose.startSession();
  let deleteId = Request.params.id;
  let userEmail = Request.headers.email;
  //   console.log(deleteId, email);
  try {
    await session.startTransaction();

    let child = {};
    child[deleteChildIdName] = deleteId;
    child[userEmail] = userEmail;

    let parent = {};
    parent["_id"] = deleteId;
    parent.userEmail = userEmail;
    let childDelete = await ChildModel.remove(child, { session });
    let parentDelete = await ParantModel.remove(parent, { session });

    await session.commitTransaction();
    session.endSession();

    return {
      status: "success",
      parentDelete: parentDelete,
      childDelete: childDelete,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return { status: "fail", data: error };
  }
};

module.exports = DeleteParentChildService;
