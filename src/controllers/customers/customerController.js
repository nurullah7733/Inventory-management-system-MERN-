const { default: mongoose } = require("mongoose");
const customerModel = require("../../models/customer/customersModel");
const salesModel = require("../../models/sales/salesModel");
const checkAssociateService = require("../../services/common/checkAssociateService");

const createService = require("../../services/common/createService");
const deleteService = require("../../services/common/deleteService");
const dropDownList = require("../../services/common/dropDownList");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");
const getServiceById = require("../../services/common/getServiceById");

exports.createCustomer = async (req, res) => {
  let data = await createService(req, customerModel);
  res.status(200).json(data);
};

exports.dropDownCustomer = async (req, res) => {
  let projection = { _id: 1, customerName: 1, phone: 1, email: 1, address: 1 };
  let data = await dropDownList(req, customerModel, projection);
  res.status(200).json(data);
};

exports.updateCustomer = async (req, res) => {
  let data = await updateService(req, customerModel);
  res.status(200).json(data);
};

exports.listCustomer = async (req, res) => {
  let searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { customerName: searchRegex },
    { phone: searchRegex },
    { email: searchRegex },
    { address: searchRegex },
  ];
  let data = await listService(req, customerModel, searchArray);
  res.status(200).json(data);
};

exports.getCustomerById = async (req, res) => {
  let result = await getServiceById(req, customerModel);
  return res.status(200).json(result);
};

exports.deleteCustomer = async (req, res) => {
  let deleteId = req.params.id;
  let objectId = mongoose.Types.ObjectId;

  let checkThisCustomerInSalesTable = await checkAssociateService(
    { customerId: objectId(deleteId) },
    salesModel
  );

  if (checkThisCustomerInSalesTable) {
    return res.status(200).json({
      status: "associate",
      data: "This customer already includes sales",
    });
  } else {
    let deleteResult = await deleteService(req, customerModel);
    return res.status(200).json({ status: "success", data: deleteResult });
  }
};
