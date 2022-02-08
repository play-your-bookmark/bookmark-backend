const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  date_time_of_visit: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
