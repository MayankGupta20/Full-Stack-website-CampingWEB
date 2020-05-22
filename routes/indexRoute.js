
//===============================
// Authentication 
//===============================
var express = require("express");
var route = express.Router();
var passport = require("passport");
var User = require("../models/user");

route.get("/",function(req,res){
	res.render("landing");
});


route.get("/register",function(req,res){
	res.render("register");
});

route.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			res.redirect("/register");
		}
		else{
			passport.authenticate('local')(req,res,function(){
				//console.log(user);
				req.flash("success","Welcome to yelpcamp "+user.username);
				res.redirect("/campgrounds");
			})
		}
	})
});

route.get("/login",function(req,res){
	res.render("login");
});

route.post("/login",passport.authenticate("local",{
	successRedirect: "/campgrounds" ,
	failureRedirect: "/login"
}),function(req,res){

});

route.get("/logout",function(req,res){
	req.logout();
	//res.send("You have logged out");
	req.flash("success","Logged You Out");
	res.redirect("/campgrounds");
});

module.exports = route;