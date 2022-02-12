const mongoose = require("mongoose");
const User = require("../models/user.model");

exports.getUser = async function (param) {
  try {
    let user = null;

    if (param.length === 28) {
      user = await User.findOne({ uid: param });
    } else {
      const objectId = mongoose.Types.ObjectId(param);

      user = await User.findById({ _id: objectId });
    }

    return user;
  } catch (error) {
    console.error(error);
    throw Error("Error while paginating user");
  }
};

exports.updateUser = async function (param, filter) {
  try {
    let updatedUser = null;

    if (param.length === 28) {
      updatedUser = await User.findOneAndUpdate({ uid: param }, filter);
    } else {
      updatedUser = await User.findOneAndUpdate({ _id: param }, filter);
    }

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw Error("Error while updating user");
  }
};

exports.deleteUser = async function (param) {
  try {
    const result = await User.findOneAndRemove({ param });
    return result;
  } catch (error) {
    console.error(error);
    throw Error("Error while deleting user");
  }
};
