const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Rope Access Logbook" });
});

router.get("/login", (req, res, next) => {
  console.log("Route reached!");
  res.render("./auth/login", {
    title: "Login"
  });
});

module.exports = router;
