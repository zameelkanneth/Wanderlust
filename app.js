const express=require("express");
const mongoose=require("mongoose");
const app=express();
const path=require("path");
const ejs=require("ejs");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingRoute=require("./routes/listing.js");
const reviewRoute=require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const userRoute=require("./routes/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
require("dotenv").config();



app.set('view engine','ejs')
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

main()
    .then(() => console.log("mongoose connected"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');

}




app.get("/",(req,res)=>{
    res.send("working");
});


const sessionOptions = {
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true }
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.returnTo = req.session.returnTo;
    next();
});

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/listings",listingRoute);
app.use("/listings/:id/reviews",reviewRoute);
app.use("/",userRoute);



app.use((err,req,res,next)=>{
console.log(err.name);

if(err.name=="CastError"){
    err.status=400,
    err.message="Invalid listing id"
}
    let {status=500,message="something went wrong"}=err;
    res.status(status).render("error.ejs",{err});
})
app.listen("8080",()=>{
    console.log(`app listening on ${8080}`);
});



   