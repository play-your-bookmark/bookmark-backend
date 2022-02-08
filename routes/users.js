const express = require("express");

const router = express.Router();
const decodeIdToken = require("../middlewares/decodeIdToken");

router.get("/new", (req, res, next) => {
  const { name, uid, email } = req.currentUser;
  res.sendStatus(200);
});

router.post("/new", (req, res, next) => {
  const { name, uid, email } = req.currentUser;
  res.sendStatus(200);
});

module.exports = router;
