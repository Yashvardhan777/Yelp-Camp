var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");


router.get("/", function(req, res){
    Campground.find({}, function(err, allCampground){
        if(err||!allCampground){
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds");
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds: allCampground, currentUser: req.user});
        }
    });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and push it in the array
    var name   = req.body.name;
    var image  = req.body.image;
    var desc   = req.body.description;
    var price  = req.body.price;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newCamground = {name: name, image: image, description: desc, price: price,author:author};
    Campground.create(newCamground, function(err, newlyAddedCampground){
        if(err||!newlyAddedCampground){
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds");
            console.log(err);
        }else{
             //redirect to the campgrounds site
            req.flash("success", "Campground is successfully added");
            res.redirect("/campgrounds");
        }
    });
   
});

//SHOW ROUTE
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err||!foundCampground){
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds");
            console.log(err);
        }else{
            // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err||!foundCampground){
            req.flash("error", "Something went wrong");
            res.redirect("back");
            console.log(err);
        } else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership,function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err||!updatedCampground){
            req.flash("error", "Something went wrong");
            res.redirect("/campground");
        } else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});

//Delete Campground route
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Something went wrong");
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;