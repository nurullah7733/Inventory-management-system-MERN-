const purchaseModel = require("../../models/purchase/purchaseModel");
const purchaseProductModel = require("../../models/purchase/purchaseProductModel");
const CreateParentChildsService = require("../../services/common/createParentChildService");
const DeleteParentChildService = require("../../services/common/deleteParentChildService");
const listOneJoinService = require("../../services/common/listOneJoinService");
const ReportService = require("../../services/report/ReportService");
const PurchaseSummaryService = require("../../services/summary/purchaseSummaryService");

exports.createPurchase = async (req, res) => {
  let result = await CreateParentChildsService(
    req,
    purchaseModel,
    purchaseProductModel,
    "purchaseId"
  );

  return res.status(200).json(result);
};

exports.listPurchaseSummary = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { note: searchRgx },
    { "suppliers.name": searchRgx },
    { "suppliers.address": searchRgx },
    { "suppliers.phone": searchRgx },
    { "suppliers.email": searchRgx },
  ];
  let joinStage = {
    $lookup: {
      from: "suppliers",
      localField: "supplierId",
      foreignField: "_id",
      as: "suppliers",
    },
  };
  let result = await listOneJoinService(
    req,
    purchaseModel,
    searchArray,
    joinStage
  );

  return res.status(200).json(result);
};

exports.deletePurchase = async (req, res) => {
  let result = await DeleteParentChildService(
    req,
    purchaseModel,
    purchaseProductModel,
    "purchaseId"
  );
  return res.status(200).json(result);
};
exports.PurchaseReport = async (req, res) => {
  let result = await ReportService(req, purchaseProductModel);
  return res.status(200).json(result);
};
exports.PurchaseSummary = async (req, res) => {
  let result = await PurchaseSummaryService(req);
  return res.status(200).json(result);
};
