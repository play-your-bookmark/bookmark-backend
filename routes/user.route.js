const express = require("express");

const router = express.Router();

const UserController = require("../controllers/user.controller");
const decodeIDToken = require("../middlewares/decodeIdToken");

router.get("/:id", decodeIDToken, UserController.getUser);
router.post("/new", decodeIDToken, UserController.saveUser);
router.put("/:id/:github", decodeIDToken, UserController.setGithubAccount);
router.delete("/:id", decodeIDToken, UserController.deleteUser);

module.exports = router;
