const Folder = require("../models/folder.model");

exports.getUserFolders = async function (param) {
  const { _id } = param;

  try {
    const folders = await Folder.find({ publisher: _id });

    return folders;
  } catch (error) {
    console.error(error);
    throw Error("Error while getting Folders");
  }
};

exports.updateFolder = async function (param) {
  const { folderList, currentUser } = param;
  // 생성 날짜가 없는 새 폴더를 위해 현재 시간 지정
  const currentDate = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");

  try {
    const result = folderList.map(async (folderInfo) => {
      const { id, title, bookmark, publisher, published_at, likes, category, parent_folder } =
        folderInfo;
      // 임시로 title로 구분하여 사용.
      // 새폴더 자체를 모달로 수정할 수 있을 경우, findByIdAndUpdate 사용
      await Folder.findOneAndUpdate(
        { title },
        {
          title,
          publisher: publisher || currentUser,
          published_at: published_at || currentDate,
          likes: likes || [],
          bookmark: bookmark || [],
          category: category || "",
          parent_folder: parent_folder || "root",
        },
        { upsert: true, new: true },
      );
    });

    return result;
  } catch (error) {
    console.error(error);
    throw Error("Error while updating Folders");
  }
};

exports.deleteFolder = async function (param) {
  try {
    await Folder.findByIdAndDelete({ _id: param });
  } catch (error) {
    console.error(error);
    throw Error("Error while deleting folder");
  }
};
// exports.addFolder = async function (param) {
//   try {
//     const result = await Folder.insert
//   }
// };

// exports.saveFolder = async function (param) {
//   try {
//     const result = await Folder.findOneAndUpdate({ param })
//   } catch (error) {
//     console.log(error);
//     throw Error("Error while saving Folder");
//   }
// };
