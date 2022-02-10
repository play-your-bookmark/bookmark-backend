const UserService = require("../services/user.service");
const User = require("../models/user.model");

exports.saveUser = async function (req, res, next) {
  const { name, uid, email } = req.currentUser;

  try {
    const user = await UserService.getUser(uid);
    if (user) {
      res.status(200).send("User already exist in db");
      return;
    }

    const newUser = new User({
      name,
      email,
      uid,
      github: "not registed",
    });

    newUser.save((err, data) => {
      if (err) {
        return res.status(500).render("error", { error: err, message: err.message });
      }

      res.status(201).send("User has been added to db");
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getUser = async function (req, res, next) {
  const userId = req.params.id;

  try {
    const user = await UserService.getUser(userId);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.setGithubAccount = async function (req, res, next) {
  const data = {
    user: {
      userId: req.params.id,
      githubAccount: req.params.github,
    },
  };

  try {
    const user = await UserService.updateUser(data.user.userId, {
      github: data.user.githubAccount,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteUser = async function (req, res, next) {
  const userId = req.params.id;

  try {
    await UserService.deleteUser(userId);

    res.status(200).send("User has been deleted");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
