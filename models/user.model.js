const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    default: "github not registed",
  },
  avatar_url: {
    type: String,
    default: "github not registed",
  },
  liked_folder: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
  ],
  created_folder: [
    {
      type: mongoose.Schema.Types.Mixed,
      ref: "Folder",
    },
  ],
});

userSchema.methods.addLikedFolder = function (folderId) {
  this.liked_folder.push(folderId);
  return this.save();
};

userSchema.methods.deleteLikedFolder = function (folderId) {
  const index = this.liked_folder.indexOf(folderId);

  if (index > -1) {
    this.liked_folder.pull(folderId);
  }
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
