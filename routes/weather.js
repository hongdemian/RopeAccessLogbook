const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("current-conditions", {
    title: "Weather"
  });
});

module.exports = router;
