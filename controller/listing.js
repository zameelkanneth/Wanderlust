const ExpressError=require("../utils/ExpressError.js");
const List=require("../models/list.js");
const cloudinary = require("../cloudConfig/cloudConfig.js");

module.exports.index=async (req,res)=>{
    
  const allListings= await List.find({});

    res.render("listing/index.ejs",{allListings});
};

module.exports.newForm=(req,res)=>{


    res.render("listing/new.ejs");
};


module.exports.postListing=async(req,res)=>{

 

    let list1={
        title:req.body.title,
        country:req.body.country,
        description:req.body.description,
        price:req.body.price,
        owner:req.user._id,
    }
   await List.insertMany(list1);

req.flash("success", "New listing created successfully!");
    res.redirect("/listings");
};


module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    
  let individual= await List.findById(id).populate("reviews");

  if(!individual){
    throw new ExpressError(404,"list not found");
  }

    res.render("listing/show.ejs",{individual});
}

module.exports.editForm=async (req,res)=>{
    let {id}=req.params;
    
  let individual= await List.findById(id);

    res.render("listing/edit.ejs",{individual});
};

module.exports.editListing=async (req,res)=>{
    let {id}=req.params;
   
let list1=await List.findById(id);

  if(!list1){
        req.flash("error","Listing not found!");
        return res.redirect("/listings");
    }
list1.title=req.body.title;
list1.price=req.body.price;
list1.country=req.body.country;
list1.description=req.body.description;
list1.image={
    
    filename:"listingimage",
    url:req.body.image
};


await list1.save();



req.flash("success", "Listing edited successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=async (req,res)=>{
    let {id}=req.params;
    
  await List.findByIdAndDelete(id);
req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};