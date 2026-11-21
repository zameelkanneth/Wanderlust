const express=require("express");
const router=express.Router();
const passport = require("passport");
const isLoggedIn=require("../middleware/isLoggedIn.js");
const userController=require("../controller/user.js")



router.route("/signup")
    .get(userController.signupForm)
    .post(userController.signupPost);

router.route("/login")
    .get(userController.loginForm)
    .post(passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),userController.loginPost);


router.post("/logout",isLoggedIn,userController.logout);


module.exports = router;