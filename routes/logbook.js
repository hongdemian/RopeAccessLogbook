const express = require("express");

const router = express.Router();
const { body } = require("express-validator/check");

const logbookController = require("../controllers/logbook");
const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, logbookController.getIndex);

//new logbook entry
router.get("/new-entry", isAuth, logbookController.getNewEntry);

//accept new entry
router.post("/new-entry", isAuth, logbookController.postNewEntry);
//get list of all entries

module.exports = router;
