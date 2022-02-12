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
  },
  browser: {
    type: String,
  },
});

const folderSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
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
  bookmark: [bookmarkSchema],
  main_category: {
    type: String,
  },
  sub_category: {
    type: String,
  },
  parent_folder: {
    type: mongoose.Schema.Types.Mixed,
    ref: "Folder",
  },
});

folderSchema.methods.addLike = function (userId) {
  this.likes.push(userId);
  return this.save();
};

folderSchema.methods.cancelLike = function (userId) {
  const index = this.likes.indexOf(userId);

  if (index > -1) {
    this.likes.pull(userId);
  }
  return this.save();
};

module.exports = mongoose.model("Folder", folderSchema);
