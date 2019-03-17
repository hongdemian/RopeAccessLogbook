const Log = require("../models/logbook");
const { validationResult } = require("express-validator/check");

const fs = require("fs");
const path = require("path");

const PDFDocument = require("pdfkit");

exports.getIndex = (req, res, next) => {
  Log.find()
    .then(logs => {
      console.log("index page start render");
      res.render("logbook/index", {
        username: "Damien",
        logs: logs,
        pageTitle: "Logbook",
        //TODO add user hours
        totalHours: "21000"
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getNewEntry = (req, res, next) => {
  res.render("logbook/edit-entry", {
    pageTitle: "Add Entry",
    path: "/logbook/new-entry",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postNewEntry = (req, res, next) => {
  const date = req.body.date;
  const time = req.body.time;
  const location = req.body.location;
  const employer = req.body.employer;
  const supervisor = req.body.supervisor;
  const email = req.body.email;
  const id = req.body.id_num;
  const hours = req.body.hours;
  const maxHeight = req.body.max_height;
  const type = req.body.typeOfWork;
  const organization = req.body.org;
  const techniques = req.body.types;
  const details = req.body.details;
  const user = req.user._id;
  const errors = validationResult(req);

  const log = new Log({
    user,
    date,
    time,
    location,
    employer,
    supervisor,
    email,
    id,
    hours,
    maxHeight,
    type,
    organization,
    techniques,
    details
  });

  log
    .save()
    .then(result => {
      console.log("Log Entry Created!");
      res.redirect("/logbook/index");
    })
    .catch(err => {
      console.log(err);
    });

  console.log("Post Logbook Entry");
  console.log(req.body);

  // if (!errors.isEmpty()) {
  //   console.log("e:" + errors);
  // }

  res.render("logbook/index", {
    pageTitle: "Logbook",
    path: "logbook",
    username: "Damien",
    logs: [],
    // logs: logs,
    //TODO add user hours
    totalHours: "21000"
  });
};
