const ExpressError=require("../utils/ExpressError.js");
const List=require("../models/list.js");

const isOwner= async (req,res,next)=>{
    let {id}=req.params;

    let listing1= await List.findById(id);

    if(!listing1){
        throw new ExpressError(404,"Listing not found");
    };

    if(!listing1.owner || !listing1.owner.equals(req.user._id)){
         req.flash("error", "You must owner to access!");
        return res.redirect(`/listings/${id}`);
    };
    next();

};

module.exports=isOwner;