const fetch = require("node-fetch");

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
        console.log(err.stack);
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
  const userId = req.query["0"];
  let user = null;
  let isMyPage = null;
  let url = null;

  try {
    if (!userId) {
      user = await UserService.getUser(req.currentUser.uid);
      isMyPage = true;
    } else {
      user = await UserService.getUser(userId);
      isMyPage = user.uid === req.currentUser.uid;
    }

    url = user.github === "github not registed" ? null : `http://www.github.com/${user.github}`;

    res.status(200).json({
      url,
      avatar_url: user.avatar_url,
      name: user.name,
      isMyPage,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.setGithubAccount = async function (req, res, next) {
  let data = null;

  if (req.params.id === "undefined") {
    data = {
      user: {
        userId: req.currentUser.uid,
        githubAccount: req.params.github,
      },
    };
  } else {
    data = {
      user: {
        userId: req.params.id,
        githubAccount: req.params.github,
      },
    };
  }

  try {
    if (data.user.githubAccount) {
      const githubAPIResponse = await fetch(
        `http://api.github.com/users/${data.user.githubAccount}`,
      );
      const githubAPIResponseJson = await githubAPIResponse.json();

      await UserService.updateUser(data.user.userId, {
        github: data.user.githubAccount,
        avatar_url: githubAPIResponseJson.avatar_url,
      });

      res.status(200).json({
        url: githubAPIResponseJson.url,
        avatarUrl: githubAPIResponseJson.avatar_url,
      });

      return;
    }

    res.status(200).json({
      url: null,
      avatarUrl: null,
    });
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
