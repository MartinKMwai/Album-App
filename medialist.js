const mongoose = require("mongoose");

var mediaList = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  url: String,
  likedBy: [],
});

module.exports = mongoose.model("Medialist", mediaList);
