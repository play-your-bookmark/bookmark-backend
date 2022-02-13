const { Types } = require("mongoose");
const mongoose = require("mongoose");
const FolderService = require("../services/folder.service");
const UserService = require("../services/user.service");
const User = require("../models/user.model");
const Folder = require("../models/folder.model");

exports.getFolders = async function (req, res, next) {
  const userObjectId = req.query["0"];
  const { uid } = req.currentUser;

  try {
    if (userObjectId) {
      const a = await User.findOneAndUpdate(
        { _id: userObjectId },
        {
          created_folder: ["6208d3cd7972fa1b845d8c9c", "6208d3da7972fa1b845d8c9d"],
        },
        { new: true },
      );
      // console.log(a);
      const user = await UserService.getUser(userObjectId);
      // console.log(user);
      const b = await User.findById(userObjectId).populate({
        path: "created_folder",
        match: {
          _id: {
            $exists: true,
          },
        },
      });
      // .exec((err, data) => console.log(data));
      console.log(b);
      return;
    }
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
    res.status(200).send({ origin, category, folders });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateFolders = async function (req, res, next) {
  const folderList = req.body;
  // publisher가 없는 새 폴더를 위해 현재 로그인한 유저 정보 지정
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

exports.handleLike = async function (req, res, next) {
  const { id, index } = req.params;
  const origin = req.query[0];

  try {
    const folder = await Folder.findById(id);
    const user = await User.findOne({ uid: req.currentUser.uid });
    const userId = user._id;
    const folderLikes = folder.likes;
    const isUserExist = folderLikes.some((objectId) => objectId.equals(userId));
    let folderAction = "save";

    if (isUserExist) {
      folderAction = "delete";
      folder.cancelLike(user._id);
      user.deleteLikedFolder(id);
      return res.status(200).send({ folder, index, origin, folderAction, id });
    }

    folder.addLike(user._id);
    user.addLikedFolder(id);

    res.status(201).send({ folder, index, origin, folderAction, id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
