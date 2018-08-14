const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  counter: String
});

const user = mongoose.model("User", userSchema);

module.exports = user;
