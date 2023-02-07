const mongoose = require("mongoose");
const productModel = require("../../models/product/productModel");
const categoryModel = require("../../models/category/categoryModel");

const createService = require("../../services/common/createService");
const dropDownList = require("../../services/common/dropDownList");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");
const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const getServiceById = require("../../services/common/getServiceById");
const expenseTypesModel = require("../../models/expense/expenseTypeModel");

exports.createCategory = async (req, res) => {
  let data = await createService(req, categoryModel);
  res.status(200).json(data);
};

exports.dropDownCategory = async (req, res) => {
  let projection = { _id: 1, name: 1 };
  let data = await dropDownList(req, categoryModel, projection);
  res.status(200).json(data);
};

exports.updateCategory = async (req, res) => {
  let data = await updateService(req, categoryModel);
  res.status(200).json(data);
};

exports.listCategory = async (req, res) => {
  let searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ name: searchRegex }];
  let data = await listService(req, categoryModel, searchArray);
  res.status(200).json(data);
};

exports.getCategoryById = async (req, res) => {
  let result = await getServiceById(req, categoryModel);
  return res.status(200).json(result);
};

exports.deleteCategory = async (req, res) => {
  let deleteId = req.params.id;
  let objectId = mongoose.Types.ObjectId;
  let queryObject = { categoryId: objectId(deleteId) };
  let checkDataOtherTable = await checkAssociateService(
    queryObject,
    productModel
  );

  if (checkDataOtherTable) {
    return res.status(200).json({
      status: "success",
      data: "This Category already Exits in Product",
    });
  } else {
    let result = await deleteService(req, categoryModel);
    return res.status(200).json(result);
  }
};
