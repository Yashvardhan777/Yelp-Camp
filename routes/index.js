var express    = require("express");
var router     = express.Router();
var passport   = require("passport");
var User       = require("../models/user");
var middleware = require("../middleware/index");


router.get("/", function(req, res){
    res.render("landing");
});

//Register New User
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err || !user){
            // console.log(err);
            req.flash("error", err.message);
            res.redirect("register");
            
        } else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect("/campgrounds");
            });
        };
    });
});

//Login User
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash:"Inavlid username or password"
}),function(req, res){
});

//logout user
router.get("/logout", function(req, res){
    req.logOut();
    req.flash("success", "Successfully logged out");
    res.redirect("/campgrounds");
});


module.exports = router;