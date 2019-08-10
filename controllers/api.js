const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  res.status(200).json({
    message: "index reached"
  });
};

exports.postSignup = (req, res, next) => {
  res.status(200).json({
    message: "postSignup reached",
    url: req.url
  });
  console.log("POST SIGNUP API route");
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const errors = validationResult(req);
  console.warn("Errors: " + errors[0]);
  if (!errors.isEmpty()) {
    console.warn(errors.array());
    return res.status(422).json({
      success: "false",
      message: "Sign-Up Failed",
      oldInput: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName
      },
      validationErrors: errors.array()
    });
  }

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email,
        firstName,
        lastName,
        password: hashedPassword
      });
      return user.save();
    })
    .then(result => {
      res.status(200).json({
        success: "true",
        message: "Sign-up Completed"
      });
      //todo NODEMAILER
      //return trasnporter.sendMail({
      //to: email,
      //from: 'no-reply@ropeaccesslogbook.ca',
      //subject: 'Sign-up Successful!',
      //html:'' });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: "false",
      message: "validation failed",
      oldInput: {
        email,
        password
      },
      validationErrors: errors.array()
    });
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(422).json({
        success: "false",
        message: "Email or Password incorrect",
        oldInput: {
          email,
          password
        }
      });
    }
    bcrypt
      .compare(password, user.password)
      .then(doMatch => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          let token = jwt.sign({ user }, process.env.SECRET, {
            expiresIn: "24h"
          });

          return req.session.save(err => {
            console.error(err);

            res.status(200).json({
              success: "true",
              message: "Logged In",
              token
              //TODO
            });
          });
        }
        return res.status(422).json({
          success: "false",
          message: "Invalid Email or Password.",
          oldInput: {
            email,
            password
          },
          validationErrors: []
        });
      })
      .catch(errors => console.error(errors));
  });
};

exports.postProfile = (req, res, next) => {
  res.status(200).json({ message: "profile requested" });
};
