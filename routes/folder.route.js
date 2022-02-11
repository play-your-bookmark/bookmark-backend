const express = require("express");
const FolderController = require("../controllers/folder.controller");

const router = express.Router();

router.get("/main", FolderController.getFolders);
// 1. 카테고리별 폴더 목록 불러오기
router.get("/category", FolderController.getCategoryFolder);
router.post("/new", FolderController.updateFolders);
router.delete("/:id", FolderController.deleteFolder);

router.put("/:id/like", (req, res, next) => {});
router.delete("/:id/like", (req, res, next) => {});

module.exports = router;
