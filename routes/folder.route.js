const express = require("express");
const FolderController = require("../controllers/folder.controller");

const router = express.Router();

router.get("/unique/:id", FolderController.getFolder);
router.get("/main", FolderController.getFolders);
router.get("/category", FolderController.getCategoryFolder);
router.post("/new", FolderController.updateFolders);
router.put("/like/:id/:index", FolderController.handleLike);
router.delete("/:_id", FolderController.deleteFolder);

module.exports = router;
