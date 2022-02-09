const express = require("express");
const ListController = require("../controllers/link.controller");

const router = express.Router();

router.get("/", ListController.getHistoryLink);

module.exports = router;
