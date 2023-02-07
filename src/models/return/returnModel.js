const mongoose = require("mongoose");
const returnSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    customerId: { type: mongoose.Schema.Types.ObjectId },
    vatTax: { type: Number },
    discount: { type: Number },
    otherCost: { type: Number },
    shippingCost: { type: Number },
    grandTotal: { type: Number },
    note: { type: String },
  },
  { versionKey: false, timestamps: true }
);
const returnModel = mongoose.model("returns", returnSchema);
module.exports = returnModel;
