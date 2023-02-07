const mongoose = require("mongoose");

const CreateParentChildsService = async (
  Request,
  ParentModel,
  ChildsModel,
  JoinPropertyName
) => {
  // Create Transaction Session
  const session = await mongoose.startSession();
  try {
    // Begin Transaction
    session.startTransaction();
    // First Database Process
    let Parent = Request.body["parent"];
    Parent.userEmail = Request.headers["email"];
    let ParentCreation = await ParentModel.create([Parent], { session });
    // console.log(Parent);
    // Second Database Process
    let Childs = Request.body["childs"];
    await Childs.forEach((element) => {
      element[JoinPropertyName] = ParentCreation[0]["_id"];
      element["userEmail"] = Request.headers["email"];
    });

    let ChildsCreation = await ChildsModel.insertMany(Childs, { session });

    // Transaction Success
    await session.commitTransaction();
    session.endSession();

    return {
      status: "success",
      Parent: ParentCreation,
      Childs: ChildsCreation,
    };
  } catch (error) {
    // Roll Back Transaction if Fail
    await session.abortTransaction();
    session.endSession();
    return { status: "fail", data: error };
  }
};
module.exports = CreateParentChildsService;
