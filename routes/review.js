const express=require("express");
const router=express.Router({mergeParams:true});
const validateReview=require("../middleware/validateReview.js");
const isLoggedIn=require("../middleware/isLoggedIn.js");
const isAuthor=require("../middleware/isAuthor.js");

const reviewControllers=require("../controller/review.js");
//post review

router.post("/",isLoggedIn,validateReview,reviewControllers.postReview);

//delete review
router.delete("/:reviewid",isLoggedIn,isAuthor,reviewControllers.deleteReview);

module.exports=router;
