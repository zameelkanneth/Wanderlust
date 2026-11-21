const mongoose=require("mongoose");
const Review = require("./review.js");

const listSchema=mongoose.Schema({
title:{
    type:String,
    required:true

},
description:{
    type:String,
    required:true
    
},
image: {
    filename: {
        type: String,
        default: "listingimage"
    },
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
    }
},
price:{
    type:Number,
    min:0
},
location:{
    type:String,
},
country:{
    type:String
},
owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},

reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "review"
}]

});

listSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({
            _id: { $in: listing.reviews }
        });
    }
});


const List=mongoose.model("List",listSchema);

module.exports=List;


