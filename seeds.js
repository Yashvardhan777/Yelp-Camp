var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    data        = [
        {
            name: "Campground1",
            image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },

        {
            name: "Campground2",
            image:"https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },

        {
            name: "Campground3",
            image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ];

function SeedDB(){
    Campground.deleteMany({}, function(err){
        if (err){
            console.log(err);
        } else {
            console.log("Campgrounds removed");
            data.forEach(function(seed){
                Campground.create(seed, function(err, data){
                    if (err){
                        console.log(err);
                    } else {
                        console.log("Campgrounds added");
                        Comment.create(
                            {
                                text   : "shitty place , never going there",
                                author : "Joe Mama"
                            },
                            function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    data.comments.push(comment);
                                    data.save();
                                    console.log("Created new comment");
                                }
                            }
                        );
                    }
                });
            });
        }
    });
}
    
module.exports = SeedDB;