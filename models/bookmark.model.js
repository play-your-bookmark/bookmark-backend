const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  utc_time: {
    type: Date,
    required: true,
  },
  browser: {
    type: String,
  },
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
