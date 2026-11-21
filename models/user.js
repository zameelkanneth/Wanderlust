const mongoose=require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema= new mongoose.Schema({
//username and password autommatically implemented by passport 
//thats why we are not adding
email:{
    type:String,
    required:true
}
});

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("User",userSchema);

module.exports=User;