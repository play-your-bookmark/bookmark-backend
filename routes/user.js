const express = require("express");
const decodeIDToken = require("../middlewares/decodeIdToken");

const router = express.Router();

router.get("/:id", (req, res, next) => {});
router.get("/:id/github", (req, res, next) => {});
router.post("/new", decodeIDToken, (req, res, next) => {
  const { name, uid, email } = req.currentUser;
  res.sendStatus(200);
});
router.put("/:id", (req, res, next) => {});

module.exports = router;
