const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  published_at: {
    type: Date,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  bookmark: [
    {
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
    },
  ],
  main_category: {
    type: String,
  },
  sub_category: {
    type: String,
  },
  parent_folder: {
    type: mongoose.Schema.Types.Mixed,
  },
});

module.exports = mongoose.model("Folder", folderSchema);
