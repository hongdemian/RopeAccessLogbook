const express = require("express");

const router = express.Router();
const { body } = require("express-validator/check");

const logbookController = require("../controllers/logbook");
const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, logbookController.getIndex);
//get list of all entries
router.get("/list", isAuth, logbookController.getList);

//new logbook entry
router.get("/new-entry", isAuth, logbookController.getNewEntry);

//accept new entry
router.post("/new-entry", isAuth, logbookController.postNewEntry);

module.exports = router;
