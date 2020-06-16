var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    flash          = require("connect-flash"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    SeedDB         = require("./seeds");

var session = require('express-session');

//-momery unleaked---------
app.set('trust proxy', 1);

app.use(session({
cookie:{
    secure: true,
    maxAge:60000
       },
store: new RedisStore(),
secret: 'secret',
saveUninitialized: true,
resave: false
}));

app.use(function(req,res,next){
if(!req.session){
    return next(new Error('Oh no')) //handle error
}
next() //otherwise continue
});
app.use(flash());

var commentRoutes    = require("./routes/comments"),
campgroundRoutes = require("./routes/campgrounds"),
authRoutes       = require("./routes/index");

// SeedDB();



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error     = req.flash("error");
    res.locals.success   = req.flash("success");
    next();  
});

// SETTING UP MONGOOSE      
// mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.connect("mongodb+srv://yashvardhanpandey777:yelpcamp@cluster0-eyikd.mongodb.net/test",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// setting up  app
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT || 3000, function(){
    console.log("The server is live");
});