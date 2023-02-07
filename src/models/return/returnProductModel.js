const mongoose = require("mongoose");
const returnProductSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    returnId: { type: mongoose.Schema.Types.ObjectId },
    productId: { type: mongoose.Schema.Types.ObjectId },
    qty: { type: Number },
    unitCost: { type: Number },
    total: { type: Number },
  },
  { versionKey: false, timestamps: true }
);
const returnProductsModel = mongoose.model(
  "returnproducts",
  returnProductSchema
);
module.exports = returnProductsModel;
