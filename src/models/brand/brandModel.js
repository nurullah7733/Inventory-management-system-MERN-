const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    name: { type: String, unique: true },
  },
  { versionKey: false, timestamps: true }
);

const brandsModel = mongoose.model("brands", brandSchema);
module.exports = brandsModel;
