const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    userEmail: String,
    typeId: { type: mongoose.Schema.Types.ObjectId },
    amount: Number,
    note: String,
  },
  { versionKey: false, timestamps: true }
);

const expenseModel = mongoose.model("expenses", expenseSchema);
module.exports = expenseModel;
