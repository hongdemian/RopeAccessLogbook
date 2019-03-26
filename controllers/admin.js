const { validationResult } = require("express-validator/check");

exports.getProfile = (req, res, next) => {
  let message = req.flash("Error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("admin/profile", {
    username: res.locals.username
  });
};

exports.postProfile = (req, res, next) => {
  res.render("error/error");
};

exports.getSettings = (req, res, next) => {
  res.render("error/error");
};

exports.postSettings = (req, res, next) => {
  res.render("error/error");
};
