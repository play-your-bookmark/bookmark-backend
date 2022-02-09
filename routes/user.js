const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/:id", (req, res, next) => {});
router.get("/:id/github", (req, res, next) => {});
router.post("/new", async (req, res, next) => {
  const { name, uid, email } = req.currentUser;

  try {
    const isUserExist = await User.findOne({ uid });

    if (isUserExist) {
      res.status(200).send("User already exist in db");
      return;
    }

    const newUser = new User({
      name,
      email,
      uid,
      github: "not registed",
    });

    newUser.save((err, data) => {
      if (err) {
        return res.status(500).render("error", { error: err, message: err.message });
      }

      res.status(201).send("User has been added to db");
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.put("/:id", (req, res, next) => {});

module.exports = router;
