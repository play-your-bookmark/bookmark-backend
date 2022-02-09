const express = require("express");

const router = express.Router();

const UserController = require("../controllers/user.controller");

router.get("/:id", UserController.getUser);
router.post("/new", UserController.saveUser);
router.put("/:id/:github", UserController.setGithubAccount);
router.delete("/:id", (req, res, next) => {});

module.exports = router;
