const express = require("express");
const { body } = require("express-validator/check");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/profile", isAuth, adminController.getProfile);
router.post("/profile", isAuth, adminController.postProfile);

router.get("/settings", isAuth, adminController.getSettings);
router.post("/settings", isAuth, adminController.postSettings);

module.exports = router;
