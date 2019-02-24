const Logbook = require("../models/logbook");
const {validationResult } = require('express-validator/check');

exports.getIndex = (req, res, next) => {
  Logbook.find()
    .then(logs => {
      console.log("index page start render");
      res.render("logbook/index", {
        username: "Damien",
        logs: logs,
        pageTitle: "Logbook",
        totalHours: "21000"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getNewEntry = (req, res, next) => {
	res.render('logbook/edit-entry', {
		pageTitle: 'Add Entry'
		path: '/logbook/new-entry',
		editing: false,
		hasError: false,
		errorMessage: null,
		validationErrors: []
	});
};

exports.postNewEntry = (req, res, next) => {
	const date = req.body.date;
	const employer = req.body.employer;
	const details = req. body.details;
	const location = req.body.location;
	const typeOfWork = req.body.typeOfWork;
	const hours = req.body.hours;
	const category = req.body.category;
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
	
	}
}