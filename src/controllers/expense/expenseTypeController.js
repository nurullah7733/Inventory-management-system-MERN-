const mongoose = require("mongoose");
const expenseTypesModel = require("../../models/expense/expenseTypeModel");
const expenseModel = require("../../models/expense/expenseModel");
const checkAssociateService = require("../../services/common/checkAssociateService");

const createService = require("../../services/common/createService");
const dropDownList = require("../../services/common/dropDownList");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");
const deleteService = require("../../services/common/deleteService");
const getServiceById = require("../../services/common/getServiceById");
const supplierModel = require("../../models/supplier/supplierModel");

exports.createExpenseType = async (req, res) => {
  let data = await createService(req, expenseTypesModel);
  res.status(200).json(data);
};

exports.dropDownExpenseType = async (req, res) => {
  let projection = { _id: 1, name: 1 };
  let data = await dropDownList(req, expenseTypesModel, projection);
  res.status(200).json(data);
};

exports.updateExpenseType = async (req, res) => {
  let data = await updateService(req, expenseTypesModel);
  res.status(200).json(data);
};

exports.listExpenseType = async (req, res) => {
  let searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ name: searchRegex }];
  let data = await listService(req, expenseTypesModel, searchArray);
  res.status(200).json(data);
};

exports.deleteExpenseType = async (req, res) => {
  let deleteId = req.params.id;
  let objectId = mongoose.Types.ObjectId;

  let checkThisCustomerInSalesTable = await checkAssociateService(
    { typeId: objectId(deleteId) },
    expenseModel
  );

  if (checkThisCustomerInSalesTable) {
    return res.status(200).json({
      status: "associate",
      data: "This ExpenseType already includes Expense",
    });
  } else {
    let deleteResult = await deleteService(req, expenseTypesModel);
    return res.status(200).json({ status: "success", data: deleteResult });
  }
};

exports.getExpenseTypeById = async (req, res) => {
  let result = await getServiceById(req, expenseTypesModel);
  return res.status(200).json(result);
};

