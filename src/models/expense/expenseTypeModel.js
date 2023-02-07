const mongoose = require("mongoose");

const expenseTypeSchema = mongoose.Schema(
  {
    userEmail: String,
    name: { type: String, unique: true },
  },
  { versionKey: false, timestamps: true }
);

const expenseTypeModel = mongoose.model("expensetypes", expenseTypeSchema);
module.exports = expenseTypeModel;
