const mongoose = require("mongoose");
const salesProductSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    salesId: { type: mongoose.Schema.Types.ObjectId },
    productId: { type: mongoose.Schema.Types.ObjectId },
    qty: { type: Number },
    unitCost: { type: Number },
    total: { type: Number },
  },
  { versionKey: false, timestamps: true }
);
const salesProductsModel = mongoose.model("salesproducts", salesProductSchema);
module.exports = salesProductsModel;
