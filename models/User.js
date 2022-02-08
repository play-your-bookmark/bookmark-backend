const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  e_mail: {
    type: String,
    required: true,
  },
  gitgub: {
    type: String,
  },
  uid: {
    type: String,
    required: true,
  },
  liked_folder: [
    {
      type: Object.Id,
      ref: "Folder",
    },
  ],
  created_folder: [
    {
      type: Object.Id,
      ref: "Folder",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
