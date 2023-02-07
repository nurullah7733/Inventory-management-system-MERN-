const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    name: { type: String },
    phone: { type: String, unique: true },
    email: { type: String },
    address: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const supplierModel = mongoose.model("suppliers", supplierSchema);
module.exports = supplierModel;
