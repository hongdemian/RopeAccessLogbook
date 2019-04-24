const Log = require("../models/logbook");
const { validationResult } = require("express-validator/check");

const fs = require("fs");
const path = require("path");

const PDFDocument = require("pdfkit");

exports.getIndex = (req, res, next) => {
  Log.find({ user: req.user._id })
    .sort({ date: -1 })
    .then(logs => {
      console.log("req: " + req.user.firstname);
      res.render("logbook/index", {
        username: res.locals.username || "Damien H",
        logs: logs,
        pageTitle: "Logbook",
        //TODO add user hours
        totalHours: "Not Calculated"
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
  const company = req.body.company;
  const supervisor = req.body.supervisor;
  const email = req.body.email;
  const id_num = req.body.id_num;
  const hours = req.body.hours;
  const maxHeight = req.body.max_height;
  const type = req.body.typeOfWork;
  const organization = req.body.org;
  const techniques = req.body.types;
  const details = req.body.details;
  const user = req.user._id;
  const errors = validationResult(req);
  console.log(techniques);

  const log = new Log(
    user,
    date,
    time,
    location,
    company,
    supervisor,
    email,
    id_num,
    hours,
    maxHeight,
    type,
    organization,
    techniques,
    details
  );

  log
    .save()
    .then(result => {
      console.log("Log Entry Created!");
    })
    .then(() => {
      Log.find({ user: req.user._id }).then(logs => {
        res.render("logbook/index", {
          username: req.user.firstname,
          logs: logs,
          pageTitle: "Logbook",
          //TODO add user hours
          totalHours: "Not Calculated"
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditLog = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/logbook");
  }
  const logId = req.params.logId;
  // console.log("logId: " + logId);
  // console.log(req);
  Log.findById(logId)
    .then(log => {
      // console.log("log: " + log);
      if (!log) {
        return res.redirect("/");
      }
      res.render("logbook/edit-entry", {
        pageTitle: "Edit Entry",
        path: "/logbook/edit-entry",
        editing: editMode,
        log: log
      });
    })
    .catch(err => console.log(err));
};

exports.postEditLog = (req, res, next) => {
  console.log("Post Edit Route");
  // console.log("res: " + res.body);
  const logId = req.body.logId;
  const date = req.body.date;
  const time = req.body.time;
  const location = req.body.location;
  const company = req.body.company;
  const supervisor = req.body.supervisor;
  const email = req.body.email;
  const id_num = req.body.id_num;
  const hours = req.body.hours;
  const maxHeight = req.body.max_height;
  const type = req.body.typeOfWork;
  const organization = req.body.org;
  const techniques = req.body.types;
  const details = req.body.details;
  const user = req.user._id;
  const errors = validationResult(req);
  console.log(techniques);

  const log = new Log(
    user,
    date,
    time,
    location,
    company,
    supervisor,
    email,
    id_num,
    hours,
    maxHeight,
    type,
    organization,
    techniques,
    details,
    logId
  );
  console.log("entry: " + log);
  log
    .save()
    .then(result => {
      console.log("UPDATED Entry!");
      res.redirect("/logbook/list");
    })
    .catch(err => {
      console.log("DB save error!");
      console.log(err);
    });
};

exports.postDeleteLog = (req, res, next) => {
  const logId = req.body.logId;
  console.log(logId);
  Log.findByIdAndDelete(logId)
    .then(() => {
      console.log("DESTROYED LOG ENTRY");
      res.redirect("/logbook/list");
    })
    .catch(err => console.log(err));
};
