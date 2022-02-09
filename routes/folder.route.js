const express = require("express");

const router = express.Router();

router.get("/:id", (req, res, next) => {});
router.post("/new", (req, res, next) => {});
router.put("/:id", (req, res, next) => {});
router.put("/:id/like", (req, res, next) => {});
router.delete("/:id", (req, res, next) => {});
router.delete("/:id/like", (req, res, next) => {});

module.exports = router;
