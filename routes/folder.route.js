const express = require("express");
const FolderController = require("../controllers/folder.controller");

const router = express.Router();

router.get("/main", FolderController.getUserCreatedFolders);
router.post("/new", FolderController.updateFolders);
router.delete("/:_id", FolderController.deleteFolder);

router.put("/:id/like", (req, res, next) => {});
router.delete("/:id/like", (req, res, next) => {});

module.exports = router;
