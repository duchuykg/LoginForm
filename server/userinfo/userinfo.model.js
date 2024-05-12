const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    login: { type: String, required: true, unique: true },
    name: String,
    avatar: String,
    role: String
  },
  {
    collection: "userinfos",
  }
);

const userinfo = mongoose.model("userinfos", userSchema);

module.exports = userinfo;