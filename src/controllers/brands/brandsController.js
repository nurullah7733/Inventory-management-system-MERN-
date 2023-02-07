const { default: mongoose } = require("mongoose");
const brandsModel = require("../../models/brand/brandModel");
const productModel = require("../../models/product/productModel");
const checkAssociateService = require("../../services/common/checkAssociateService");
const createService = require("../../services/common/createService");
const deleteService = require("../../services/common/deleteService");
const dropDownList = require("../../services/common/dropDownList");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");
const getServiceById = require("../../services/common/getServiceById");

exports.createBrand = async (req, res) => {
  let data = await createService(req, brandsModel);
  res.status(200).json(data);
};

exports.dropDownBrands = async (req, res) => {
  let projection = { _id: 1, name: 1 };
  let data = await dropDownList(req, brandsModel, projection);
  res.status(200).json(data);
};

exports.getBrandDetailById = async (req, res) => {
  let data = await getServiceById(req, brandsModel);
  res.status(200).json(data);
};

exports.updateBrand = async (req, res) => {
  let data = await updateService(req, brandsModel);
  res.status(200).json(data);
};

exports.listBrands = async (req, res) => {
  let searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ name: searchRegex }];
  let data = await listService(req, brandsModel, searchArray);
  res.status(200).json(data);
};

exports.deleteBrand = async (req, res) => {
  let deleteId = req.params.id;
  let objectId = mongoose.Types.ObjectId;
  let queryObject = { brandId: objectId(deleteId) };
  let checkDataOtherTable = await checkAssociateService(
    queryObject,
    productModel
  );

  if (checkDataOtherTable) {
    return res
      .status(200)
      .json({ status: "success", data: "This brand already Exits in Product" });
  } else {
    let result = await deleteService(req, brandsModel);
    return res.status(200).json(result);
  }
};
