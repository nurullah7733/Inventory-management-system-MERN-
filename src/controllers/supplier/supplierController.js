const mongoose = require("mongoose");
const supplierModel = require("../../models/supplier/supplierModel");
const purchaseModel = require("../../models/purchase/purchaseModel");
const checkAssociateService = require("../../services/common/checkAssociateService");

const createService = require("../../services/common/createService");
const dropDownList = require("../../services/common/dropDownList");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");
const deleteService = require("../../services/common/deleteService");
const getServiceById = require("../../services/common/getServiceById");

exports.createSupplier = async (req, res) => {
  let data = await createService(req, supplierModel);
  res.status(200).json(data);
};

exports.dropDownSupplier = async (req, res) => {
  let projection = { _id: 1, name: 1, phone: 1, email: 1, address: 1 };
  let data = await dropDownList(req, supplierModel, projection);
  res.status(200).json(data);
};

exports.updateSupplier = async (req, res) => {
  let data = await updateService(req, supplierModel);
  res.status(200).json(data);
};

exports.listSupplier = async (req, res) => {
  let searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { name: searchRegex },
    { phone: searchRegex },
    { email: searchRegex },
    { address: searchRegex },
  ];
  let data = await listService(req, supplierModel, searchArray);
  res.status(200).json(data);
};

exports.deleteSupplier = async (req, res) => {
  let deleteId = req.params.id;
  let objectId = mongoose.Types.ObjectId;

  let checkThisCustomerInSalesTable = await checkAssociateService(
    { supplierId: objectId(deleteId) },
    purchaseModel
  );

  if (checkThisCustomerInSalesTable) {
    return res.status(200).json({
      status: "associate",
      data: "This Supplier already includes purchase",
    });
  } else {
    let deleteResult = await deleteService(req, supplierModel);
    return res.status(200).json({ status: "success", data: deleteResult });
  }
};

exports.getSupplierById = async (req, res) => {
  let result = await getServiceById(req, supplierModel);
  return res.status(200).json(result);
};
