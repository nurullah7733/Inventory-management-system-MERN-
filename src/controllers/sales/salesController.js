const salesModel = require("../../models/sales/salesModel");
const salesProductsModel = require("../../models/sales/saleProductModel");
const CreateParentChildsService = require("../../services/common/createParentChildService");
const listOneJoinService = require("../../services/common/listOneJoinService");
const DeleteParentChildService = require("../../services/common/deleteParentChildService");
const ReportService = require("../../services/report/ReportService");
const salesSummaryService = require("../../services/summary/salesSummaryService");

exports.createSales = async (req, res) => {
  let result = await CreateParentChildsService(
    req,
    salesModel,
    salesProductsModel,
    "salesId"
  );

  return res.status(200).json(result);
};

exports.salesList = async (req, res) => {
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
    salesModel,
    searchArray,
    joinState
  );

  return res.status(200).json(result);
};

exports.deleteSales = async (req, res) => {
  let result = await DeleteParentChildService(
    req,
    salesModel,
    salesProductsModel,
    "salesId"
  );
  return res.status(200).json(result);
};
exports.reportSales = async (req, res) => {
  let result = await ReportService(req, salesProductsModel);
  return res.status(200).json(result);
};
exports.SalesSummary = async (req, res) => {
  let result = await salesSummaryService(req);
  return res.status(200).json(result);
};
