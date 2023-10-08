const express = require("express");
const router = express.Router();
const {userRegistration} = require("../controllers/UserController")

router.route("/signUp").post(userRegistration);

module.exports = router;
