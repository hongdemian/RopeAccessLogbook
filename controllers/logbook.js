const fs = require("fs");
const path = require("path");

const PDFDocument = require("pdfkit");

const Logbook = require("../models/logbook");

exports.getLogs = (req, res, next) => {
  Logbook.find()
    .then(log => {
      console.log(log);
      res.render("log/log-list", {
        logs: log,
        pageTitle: "All Logs",
        path: "/logs"
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
