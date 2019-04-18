const express = require("express");
const weatherController = require("../controllers/weather");

const router = express.Router();

router.get("/", weatherController.getCurrent);

module.exports = router;
