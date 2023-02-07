const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    password: String,
    mobile: String,
    photo: String,
  },
  { versionKey: false, timestamps: true }
);

var UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
