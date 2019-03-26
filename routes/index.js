const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    pageTitle: "Rope Access Logbook",
    title: "Logbook",
    username: res.locals.username
  });
});

module.exports = router;
