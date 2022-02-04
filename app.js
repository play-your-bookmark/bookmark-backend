const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
// db 저장하기 전에 입력값들 체크용 (prod)
const sanitizeHtml = require("sanitize-html");
const hpp = require("hpp");

dotenv.config();
// 라우터(import)

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan("dev"))
}
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));


// 라우터(use)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
