const express = require("express");

const errorController = require("../controllers/error");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/error", errorController.getError);

module.exports = router;
