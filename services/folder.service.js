const Folder = require("../models/folder.model");
const User = require("../models/user.model");

exports.getFolders = async function (filter) {
  try {
    const folders = await Folder.find(filter);

    return folders;
  } catch (error) {
    console.error(error);
    throw Error("Error while getting Folders");
  }
};

exports.getUniqueFolder = async function (param) {
  try {
    const uniqueFolder = await Folder.findById(param);

    return uniqueFolder;
  } catch (error) {
    console.error(error);
    throw Error("Error while getting unique folder");
  }
};

exports.updateFolder = async function (param) {
  const { folderList, userId } = param;
  try {
    folderList.map(async (folderInfo) => {
      const {
        _id,
        title,
        bookmark,
        main_category,
        sub_category,
        published_at,
        likes,
        parent_folder,
      } = folderInfo;

      if (_id.split(" ")[1] === "new") {
        await Folder.create({
          _id: _id.split(" ")[0],
          title: title,
          publisher: userId,
          published_at: published_at,
          main_category: main_category,
          sub_category: sub_category,
          likes: likes || [],
          bookmark: bookmark || [],
          parent_folder: parent_folder.split(" ")[0],
        });

        return;
      }

      await Folder.findByIdAndUpdate(
        _id,
        {
          $set: {
            title: title,
            likes: likes,
            bookmark: bookmark,
            main_category: main_category,
            sub_category: sub_category,
            parent_folder: parent_folder,
          },
        },
        { upsert: true, new: true },
      );
    });

    const result = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          created_folder: folderList,
        },
      },
      { new: true },
    );
  } catch (error) {
    console.error(error);
    throw Error("Error while updating Folders");
  }
};

exports.deleteFolder = async function (param) {
  try {
    await Folder.findByIdAndDelete(param);
  } catch (error) {
    console.error(error);
    throw Error("Error while deleting folder");
  }
};
