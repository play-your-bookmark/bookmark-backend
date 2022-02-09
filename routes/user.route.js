const express = require("express");

const router = express.Router();

const UserController = require("../controllers/user.controller");

router.get("/:id", (req, res, next) => {});
router.get("/:id/github", (req, res, next) => {});
router.post("/new", UserController.saveUser);
router.put("/:id", (req, res, next) => {});

module.exports = router;
