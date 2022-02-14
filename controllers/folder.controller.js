const { Types } = require("mongoose");
const mongoose = require("mongoose");
const FolderService = require("../services/folder.service");
const UserService = require("../services/user.service");
const User = require("../models/user.model");
const Folder = require("../models/folder.model");

exports.getFolder = async function (req, res, next) {
  const { id } = req.params;

  try {
    const uniqueFolder = await Folder.findById(id);

    if (uniqueFolder) {
      return res.status(200).send(uniqueFolder);
    }

    return res.status(404).send("Folder Not Found");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getFolders = async function (req, res, next) {
  const userObjectId = req.query["0"];
  const { uid } = req.currentUser;

  try {
    if (userObjectId) {
      const userCreatedFolders = await User.findById(userObjectId).populate({
        path: "created_folder",
        match: {
          _id: {
            $exists: true,
          },
        },
      });

      if (!userCreatedFolders.created_folder.length) {
        return res.status(200).json([]);
      }
      res.status(200).json(userCreatedFolders.created_folder);
      return;
    }

    const userCreatedFolders = await User.findOne({ uid }).populate({
      path: "created_folder",
      match: {
        _id: {
          $exists: true,
        },
      },
    });

    if (!userCreatedFolders.created_folder.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(userCreatedFolders.created_folder);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getCategoryFolder = async function (req, res, next) {
  const compare = (a, b) => (a.likes.length > b.likes.length ? -1 : 1);
  const origin = req.query["0"];
  const category = req.query["1"];

  const user = await User.findOne({ uid: req.currentUser.uid });
  const userId = user._id;

  let filter = null;
  if (origin === "mainCategory") {
    filter = { main_category: category };
  } else {
    filter = { sub_category: category };
  }

  try {
    const folders = await FolderService.getFolders(filter);
    folders.sort(compare);
    res.status(200).send({ origin, category, folders, userId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getLikeFolder = async function (req, res, next) {
  const userObjectId = req.query["0"];
  const { uid } = req.currentUser;

  try {
    if (userObjectId) {
      const userLikeFolders = await User.findById(userObjectId).populate({
        path: "liked_folder",
        match: {
          _id: {
            $exists: true,
          },
        },
      });

      res.status(200).json(userLikeFolders.liked_folder);
      return;
    }

    const userLikeFolders = await User.findOne({ uid }).populate({
      path: "liked_folder",
      match: {
        _id: {
          $exists: true,
        },
      },
    });

    res.status(200).json(userLikeFolders.liked_folder);
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
      await FolderService.updateFolder({ folderList, userId });

      res.status(200).send("update success");
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
