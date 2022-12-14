var passportLocalMongoose = require("passport-local-mongoose"),
  mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  friends: [{ type: String }],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
