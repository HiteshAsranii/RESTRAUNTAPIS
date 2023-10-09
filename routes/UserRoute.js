const express = require("express");
const router = express.Router();
const {userRegistration} = require("../controllers/UserController")

router.route("/signUp").post(userRegistration);

module.exports = router;


//signup request body 
// {
//     "UserName": "HiteshAsrani",
//     "PhoneNo": "9876543109",
//     "Email": "hitesh.asrani@gmail.com",
//     "Password": "SDhQRRHl+jtEUbOK/U9Qa6HjooFf8vM+5phwSHvBO8zkWJF+cK0JhtJk2gT/olyxphJG01lZ2s9H67I/3dUVDg=="
// }