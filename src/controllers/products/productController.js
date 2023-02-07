const mongoose = require("mongoose");
const productModel = require("../../models/product/productModel");
const purchaseProduct = require("../../models/purchase/purchaseProductModel");
const returnProduct = require("../../models/return/returnProductModel");
const salesProduct = require("../../models/sales/saleProductModel");
const createService = require("../../services/common/createService");
const updateService = require("../../services/common/updateService");
const listTwoJoinService = require("../../services/common/listTwoJoinService");
const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const getServiceById = require("../../services/common/getServiceById");
const brandsModel = require("../../models/brand/brandModel");
const dropDownList = require("../../services/common/dropDownList");

exports.createProduct = async (req, res) => {
  let result = await createService(req, productModel);
  return res.status(200).json(result);
};

exports.productDropdownList = async (req, res) => {
  let projection = { _id: 1, name: 1 };
  let result = await dropDownList(req, productModel, projection);
  return res.status(200).json(result);
};

exports.getProductDetailById = async (req, res) => {
  let data = await getServiceById(req, productModel);
  res.status(200).json(data);
};
exports.updateProduct = async (req, res) => {
  let result = await updateService(req, productModel);
  return res.status(200).json(result);
};

exports.listProducts = async (req, res) => {
  let joinStage1 = {
    $lookup: {
      from: "brands",
      localField: "brandId",
      foreignField: "_id",
      as: "brand",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "categories",
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
    },
  };
  let regexValue = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { name: regexValue },
    { unit: regexValue },
    { "brand.name": regexValue },
    { "category.name": regexValue },
  ];

  let result = await listTwoJoinService(
    req,
    productModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};

exports.deleteProduct = async (req, res) => {
  let deleteId = req.params.id;
  let objectId = mongoose.Types.ObjectId;

  let checkAssociateTable1 = await checkAssociateService(
    { productId: objectId(deleteId) },
    purchaseProduct
  );
  let checkAssociateTable2 = await checkAssociateService(
    { productId: objectId(deleteId) },
    returnProduct
  );
  let checkAssociateTable3 = await checkAssociateService(
    { productId: objectId(deleteId) },
    salesProduct
  );
  if (checkAssociateTable1) {
    return res.status(200).json({
      status: "associate",
      data: "This Product associate with purchase",
    });
  } else if (checkAssociateTable2) {
    return res.status(200).json({
      status: "success",
      data: "This Product associate with return",
    });
  } else if (checkAssociateTable3) {
    return res.status(200).json({
      status: "success",
      data: "This Product associate with sales",
    });
  } else {
    let deleteResult = await deleteService(req, productModel);
    return res.status(200).json({ status: "success", data: deleteResult });
  }
};
