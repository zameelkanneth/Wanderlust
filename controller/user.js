const ExpressError=require("../utils/ExpressError.js");
const User=require("../models/user.js");


module.exports.signupForm=(req,res)=>{

res.render("users/signup.ejs");

};

module.exports.signupPost=async(req,res)=>{

    let{username,email,password}=req.body;

    const newUser=new User({
        email:email,
        username:username
    });

    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);

res.redirect("/listings");

};

module.exports.loginForm=(req,res)=>{

res.render("users/login.ejs");

};

module.exports.loginPost=async (req,res)=>{

            req.flash("success", "Welcome back!");

 let redirectUrl = res.locals.returnTo || "/listings";
delete req.session.returnTo;
res.redirect(redirectUrl);

};

module.exports.logout=(req,res,next)=>{

req.logout((err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","you have logged out successfully");
    res.redirect("/listings");
});


};