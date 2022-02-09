const User = require("../models/user.model");

exports.getUser = async function (param) {
  try {
    const user = await User.findOne({ param });
    return user;
  } catch (error) {
    console.error(error);
    throw Error("Error while paginating user");
  }
};

exports.updateUser = async function (param, filter) {
  try {
    const updatedUser = await User.findOneAndUpdate({ param }, filter);
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
