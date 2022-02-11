const FolderService = require("../services/folder.service");
const UserService = require("../services/user.service");
const User = require("../models/user.model");

exports.getFolders = async function (req, res, next) {
  const { uid } = req.currentUser;

  try {
    const user = await UserService.getUser(uid);

    if (user) {
      const { _id } = user;
      const filter = { publisher: _id };

      try {
        const folders = await FolderService.getFolders(filter);

        res.status(200).json(folders);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getCategoryFolder = async function (req, res, next) {
  const origin = req.query["0"];
  const category = req.query["1"];

  let filter = null;
  if (origin === "mainCategory") {
    filter = { main_category: category };
  } else {
    filter = { sub_category: category };
  }

  try {
    const folders = await FolderService.getFolders(filter);
    res.status(200).send(folders);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateFolders = async function (req, res, next) {
  const folderList = req.body;
<<<<<<< HEAD
  // publisher가 없는 새 폴더를 위해 현재 로그인한 유저 정보 지정
=======

>>>>>>> 9a165c67a8d39b3f68bcfbbaad6ab45e0c3369f1
  try {
    const user = await User.findOne({ uid: req.currentUser.uid });
    const userId = user._id;

    try {
      const result = await FolderService.updateFolder({ folderList, userId });

      res.send(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteFolder = async function (req, res, next) {
  const { _id } = req.params;

  try {
    await FolderService.deleteFolder(_id);

    res.status(200).send("Folder has been deleted");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
