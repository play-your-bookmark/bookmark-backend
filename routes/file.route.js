const express = require("express");
const { parse } = require("node-html-parser");

const router = express.Router();
router.post("/", (req, res, next) => {
  const result = Buffer.from(req.file.buffer).toString("utf-8");
  const root = parse(result);
  const bookmarklink = root.querySelectorAll("a").map((element) => {
    return { url: element.rawAttrs.split(" ")[0].slice(6, -1), title: element.innerText };
  });

  res.status(200).send(bookmarklink);
});
module.exports = router;
