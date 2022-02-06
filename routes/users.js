const express = require('express');
const { UserImportBuilder } = require('firebase-admin/lib/auth/user-import-builder');
const router = express.Router();
const decodeIdToken = require("../middlewares/decodeIdToken");

/* GET users listing. */
router.post('/new', function(req, res, next) {
  const { name, uid, email } = req.currentUser;
});

module.exports = router;
