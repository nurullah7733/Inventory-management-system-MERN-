const expenseModel = require("../../models/expense/expenseModel");

const createService = require("../../services/common/createService");
const deleteService = require("../../services/common/deleteService");
const listOneJoinService = require("../../services/common/listOneJoinService");
const updateService = require("../../services/common/updateService");
const expenseReportService = require("../../services/report/expenseReportService");
const getServiceById = require("../../services/common/getServiceById");
const ExpenseSummaryService = require("../../services/summary/expenseSummaryService");

exports.createExpense = async (req, res) => {
  let data = await createService(req, expenseModel);
  res.status(200).json(data);
};

exports.updateExpense = async (req, res) => {
  let data = await updateService(req, expenseModel);
  res.status(200).json(data);
};

exports.listExpense = async (req, res) => {
  let searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  let joinStage = {
    $lookup: {
      from: "expensetypes",
      localField: "typeId",
      foreignField: "_id",
      as: "type",
    },
  };

  let searchArray = [
    { amount: searchRegex },
    { note: searchRegex },
    { "type.name": searchRegex },
  ];
  let data = await listOneJoinService(
    req,
    expenseModel,
    searchArray,
    joinStage
  );
  res.status(200).json(data);
};

exports.getExpenseDetailById = async (req, res) => {
  let data = await getServiceById(req, expenseModel);
  res.status(200).json(data);
};

exports.deleteExpense = async (req, res) => {
  let result = await deleteService(req, expenseModel);

  return res.status(200).json(result);
};

exports.expenseReport = async (req, res) => {
  let result = await expenseReportService(req, expenseModel);
  return res.status(200).json(result);
};

exports.expenseSummary = async (req, res) => {
  let result = await ExpenseSummaryService(req);

  return res.status(200).json(result);
};
