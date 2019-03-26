const express = require("express");
const router = express.Router();

router.get("/flha", (req, res, next) => {
  res.render("/forms/flha", {
    title: "Field Level Hazard Assessment"
  });
});

router.post("/flha", (req, res, next) => {
  res.render("/forms/thanks", {
    title: "Success",
    form: "Field Level Hazard Assessment"
  });
});

router.get("/rplan", (req, res, next) => {
  res.render("/forms/rplan", {
    title: "Fall Rescue Plan"
  });
});

router.post("/rplan", (req, res, next) => {
  res.render("/forms/thanks", {
    title: "Success",
    form: "Fall Rescue Plan"
  });
});

router.get("/emerg", (req, res, next) => {});

module.exports = router;
