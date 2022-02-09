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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookmark",
    },
  ],
  category: {
    type: String,
    required: true,
  },
  parent_folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
});

module.exports = mongoose.model("Folder", folderSchema);
