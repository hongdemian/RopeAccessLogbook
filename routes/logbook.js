const express = require("express");

const router = express.Router();
const logbookController = require("../controllers/logbook");
const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, logbookController.getIndex);

//new logbook entry

//accept new entry

//get list of all entries

module.exports = router;
