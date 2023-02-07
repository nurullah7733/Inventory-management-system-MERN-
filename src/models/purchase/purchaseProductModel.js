const mongoose = require("mongoose");
const purchaseProductSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    purchaseId: { type: mongoose.Schema.Types.ObjectId },
    productId: { type: mongoose.Schema.Types.ObjectId },
    qty: { type: Number },
    unitCost: { type: Number },
    total: { type: Number },
  },
  { versionKey: false, timestamps: true }
);
const PurchaseProductsModel = mongoose.model(
  "purchaseproducts",
  purchaseProductSchema
);
module.exports = PurchaseProductsModel;
