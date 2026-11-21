const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");

const isAuthor = async (req,res,next)=>{
    let {id,reviewid}=req.params;

    let review1= await Review.findById(reviewid);

    if(!review1){
        throw new ExpressError(404,"review not found");
    };

    if(!review1.author || !review1.author.equals(req.user._id)){
         req.flash("error", "You must be the author to access!");
        return res.redirect(`/listings/${id}`);
    };
    next();

};

module.exports=isAuthor;