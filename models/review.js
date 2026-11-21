const mongoose=require("mongoose");

const reviewSchema=mongoose.Schema({

username:{
    type:String,
    required:true
},
comment:{
 type:String,
    required:true
},
rating:{
    type:Number,
    required:true,
    min:1,
    max:5
},
author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}

});

const review=mongoose.model("review",reviewSchema);

module.exports=review;