const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    userEmail: { type: String },
    name: { type: String, unique: true },
  },
  { versionKey: false, timestamps: true }
);

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel;
