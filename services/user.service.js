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
