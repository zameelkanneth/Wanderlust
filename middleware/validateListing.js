const ExpressError=require("../utils/ExpressError.js");
const listingSchema=require("../schema/listing.js");


const validateListing=(req,res,next)=>{
    const {error}=listingSchema.validate(req.body);

    if(error){
        throw new ExpressError(400,error.message);
    }
    next();

}

module.exports=validateListing;