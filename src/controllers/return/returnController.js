const returnModel = require("../../models/return/returnModel");
const returnProductModel = require("../../models/return/returnProductModel");
const CreateParentChildsService = require("../../services/common/createParentChildService");
const DeleteParentChildService = require("../../services/common/deleteParentChildService");
const listOneJoinService = require("../../services/common/listOneJoinService");
const ReportService = require("../../services/report/ReportService");
const returnSummaryService = require("../../services/summary/returnSummaryService");

exports.createReturn = async (req, res) => {
  let result = await CreateParentChildsService(
    req,
    returnModel,
    returnProductModel,
    "returnId"
  );

  return res.status(200).json(result);
};

exports.ReturnList = async (req, res) => {
  let joinState = {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer",
    },
  };
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { note: searchRgx },
    { "customer.customerName": searchRgx },
    { "customer.phone": searchRgx },
    { "customer.email": searchRgx },
    { "customer.address": searchRgx },
  ];

  let result = await listOneJoinService(
    req,
    returnModel,
    searchArray,
    joinState
  );

  return res.status(200).json(result);
};

exports.deleteReturn = async (req, res) => {
  let result = await DeleteParentChildService(
    req,
    returnModel,
    returnProductModel,
    "returnId"
  );

  return res.status(200).json(result);
};
exports.ReturnReport = async (req, res) => {
  let result = await ReportService(req, returnProductModel);

  return res.status(200).json(result);
};
exports.ReturnSummary = async (req, res) => {
  let result = await returnSummaryService(req);

  return res.status(200).json(result);
};
