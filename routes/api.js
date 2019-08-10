const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");
const apiAuth = require("../middleware/apiAuth");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router
  .route("/signup")
  .get(apiController.getIndex)
  .post(apiController.postSignup);
router.route("/login").post(apiController.postLogin);

// router.post("/", apiController.postIndex);

// router.post("/profile", apiAuth, apiController.postProfile);

module.exports = router;
