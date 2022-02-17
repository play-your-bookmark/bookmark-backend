const createError = require("http-errors");
const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");

const router = express.Router();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const sanitizeHtml = require("sanitize-html");
const hpp = require("hpp");
const connectDB = require("./db");

connectDB().then((data) => {
  console.log("data connected");
});

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}

app.use(cors({ credentials: true, origin: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const user = require("./routes/user.route");
const folder = require("./routes/folder.route");
const link = require("./routes/list.route");
const decodeIDToken = require("./middlewares/decodeIdToken");

app.use("/ping", (req, res, next) => {
  res.status(200).json({ ping: "ok" });
});
app.use("/user", decodeIDToken, user);
app.use("/folder", folder);
app.use("/link", decodeIDToken, link);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
