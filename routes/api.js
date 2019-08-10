const express = require("express");
const router = express.Router();

const apiController = require("../controllers/api");
const apiAuth = require("../middleware/apiAuth");

router.post("/signup", apiController.postSignup);
router.post("/login", apiController.postLogin);

router.post("/", apiController.postIndex);

// router.post("/profile", apiAuth, apiController.postProfile);

module.exports = router;
