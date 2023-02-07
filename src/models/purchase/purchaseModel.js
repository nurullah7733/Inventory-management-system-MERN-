const mongoose = require("mongoose");
const purchaseSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    supplierId: { type: mongoose.Schema.Types.ObjectId },
    vatTax: { type: Number },
    discount: { type: Number },
    otherCost: { type: Number },
    shippingCost: { type: Number },
    grandTotal: { type: Number },
    note: { type: String },
  },
  { versionKey: false, timestamps: true }
);
const PurchasesModel = mongoose.model("purchases", purchaseSchema);
module.exports = PurchasesModel;
