const mongoose = require("mongoose");
const salesSchema = mongoose.Schema(
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
const salesModel = mongoose.model("sales", salesSchema);
module.exports = salesModel;
