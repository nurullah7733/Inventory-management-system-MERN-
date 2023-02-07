const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    customerName: { type: String },
    phone: { type: String, unique: true },
    email: { type: String },
    address: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const customerModel = mongoose.model("customers", customerSchema);
module.exports = customerModel;
