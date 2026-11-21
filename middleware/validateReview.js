const ExpressError=require("../utils/ExpressError.js");
const reviewSchema=require("../schema/reviews.js");


const validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);

    if(error){
        throw new ExpressError(400,error.message);
    }
    next();

}

module.exports=validateReview;