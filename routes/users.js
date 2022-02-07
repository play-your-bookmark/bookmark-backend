const express = require("express");

const router = express.Router();
const decodeIdToken = require("../middlewares/decodeIdToken");

router.post("/new", (req, res, next) => {
  const { name, uid, email } = req.currentUser;
});

module.exports = router;
