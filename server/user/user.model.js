const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isisConfirmed: { type: Boolean, default: false}
  },
  {
    collection: "users",
  }
);

const user = mongoose.model("users", userSchema);

module.exports = user;