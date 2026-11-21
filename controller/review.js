const ExpressError=require("../utils/ExpressError.js");
const review=require("../models/review.js");
const List=require("../models/list.js");



module.exports.postReview=async(req,res)=>{
    let {id}=req.params;
    
      let list1= await List.findById(id);
    if (!list1) {
    throw new ExpressError(404, "Listing not found");
}

    let review1=new review({
        username:req.body.username,
        comment:req.body.comment,
        rating:req.body.rating,
        author: req.user._id
    });
    await review1.save();

 
    list1.reviews.push(review1._id);
    await list1.save();
req.flash("success", "New review submitted successfully!");
    res.redirect(`/listings/${id}`);

    };

module.exports.deleteReview=async(req,res)=>{
    let {id,reviewid}=req.params;
    await review.findByIdAndDelete(reviewid);

    await List.findByIdAndUpdate(id,{
        $pull:{reviews:reviewid}
    });
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
    };