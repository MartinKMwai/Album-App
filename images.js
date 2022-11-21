const mongoose = require("mongoose");

var imagesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  images: [{ image: String, comment: String }],
});

module.exports = mongoose.model("Images", imagesSchema);
