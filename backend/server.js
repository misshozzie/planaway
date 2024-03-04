var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var User = require("./daos/user");
var securityMiddleware = require("./middlewares/security");
var connectDB = require("./client/mongo");

require("dotenv").config();
require("./routes/index");

var usersRouter = require("./routes/users");
var tripsRouter = require("./routes/trips");
var plansRouter = require("./routes/plans");
var authRoutes = require("./routes/auth.routes");


connectDB()
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors({ origin: 'http://localhost:5173' }));
app.listen(3001, () => console.log('Server running on port 3001'));

/*****  Middlewares  *****/
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(securityMiddleware.checkJWT);

app.use("/users", usersRouter);
app.use("/trips", tripsRouter);
app.use("/plans", plansRouter);
app.use("/api/auth", authRoutes);

app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};


  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
