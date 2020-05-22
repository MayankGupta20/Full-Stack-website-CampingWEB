// all middleware goes here 
var middleware = {};
var comment = require("../models/comments");
var campground = require("../models/campground");

//Comment Authorization
middleware.checkCommentOwnership=function checkCommentOwnership(req,res,next){

		if(req.isAuthenticated){
			comment.findById(req.params.cmt_id,function(err,cmt){
			if(err){
				res.redirect("/campgrounds");
			}else{
				console.log(cmt);
				if(req.user._id.equals(cmt.author.id)){
					next();
				}else{
					req.flash("error","You Do not have permission to do that ");
					res.redirect("back");
				}
			
			}
		});
		}else{

			req.flash("error","You need to be logged in first !!!");
			res.redirect("/login");
		}

}

// middleware to chek campground ownership
// Authorization
middleware.checkCampgroundOwnership=function checkCampgroundOwnership(req,res,next){
	if(req.isAuthenticated()){
		campground.findById(req.params.id,function(err,foundCamp){
			if(err){
				//res.send("no campground found");
				req.flash("error","Something went wrong");
				res.redirect("back");
			}else{
				//.equals is used instead of === because 
				//foundCamp.author.id is mongoose objectId
				// req.user._id is a string
				if(foundCamp.author.id.equals(req.user._id)){
					//console.log("you can edit campground ");
					next();
				}else{
					req.flash("error","you do not have permission to do that");
					res.redirect("back");
				}
			}
		})
	}else{
		//res.send("You need to be logged in")
		req.flash("error","You need to be Logged in first !!");
		res.redirect("/login");
	}
}

//User Authentication 
middleware.isLoggedIn = function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		//console.log("User found authenticated");
		next();
	}else{
		req.flash("error","Please,Login First!!");
		res.redirect("/login");
	}
	
}


module.exports= middleware;
