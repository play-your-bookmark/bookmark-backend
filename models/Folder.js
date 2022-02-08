const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publisher: {
    type: Object.Id,
    ref: "User",
  },
  published_at: {
    type: Date,
  },
  likes: [
    {
      type: Object.Id,
      ref: "User",
    },
  ],
  bookmark: [
    {
      type: Object.Id,
      ref: "Bookmark",
    },
  ],
  category: {
    type: String,
    required: true,
  },
  parent_folder: {
    type: Object.Id,
    ref: "Folder",
  },
});

module.exports = mongoose.model("Folder", folderSchema);
