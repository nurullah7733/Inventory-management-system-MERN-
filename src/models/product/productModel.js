const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    userEmail: String,
    brandId: { type: mongoose.Schema.Types.ObjectId },
    categoryId: { type: mongoose.Schema.Types.ObjectId },
    name: String,
    unit: String,
    details: String,
  },
  { versionKey: false, timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
