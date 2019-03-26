const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const app = express();
const User = require("./models/user");
//database init
const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://Damien-data:CCKGzdC3GHVyXPyZ@testingcluster-8doar.mongodb.net/LogBook";
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//middleware
const bodyParser = require("body-parser");
const csrfProtection = csrf();
const flash = require("connect-flash");

//image upload
const multer = require("multer");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "user/media/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image.pdf"
  ) {
    cb(null, true);
  }

  cb(null, false);
};

// routes setup
const errorController = require("./controllers/error");

const indexRoutes = require("./routes/index");
// const formsRoutes = require("./routes/forms");
const logbookRoutes = require("./routes/logbook");
const authRoutes = require("./routes/auth");
// const adminRoutes = require("./routes/admin");
// const weatherRoutes = require("./routes/weather");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(
  session({
    secret: "QIbmg09o37JSbq9NhBSr",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  res.locals.username = user.firstname;
  next();
});

app.use("/", indexRoutes);
// app.use(formsRoutes);
// app.use(adminRoutes);
app.use("/logbook", logbookRoutes);
app.use(authRoutes);
// app.use('/weather', weatherRoutes);

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
  res.render("error/error");
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(result => {
    console.log("Connected to MongoDB!");
  })
  .catch(err => {
    console.log("Error connecting to Mongo Server!");
  });

module.exports = app;
