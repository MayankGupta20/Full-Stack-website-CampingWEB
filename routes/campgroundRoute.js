var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var isLoggedIn = require("../middleware/index");
var middleware = require("../middleware/index");

//=====middleware=========



// express.Router() is used to refactor routes i.e break route in different files


router.get("/",function(req,res){

	campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds});
		}
	});
	//res.render("campgrounds",{campgrounds:campgrounds});
	//res.render("test");
	
});

router.post("/",middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;
	var author = {
		id:req.user._id,
		username:req.user.username
	}
	var newCampground = {name:name,image:image,description:desc,author:author,price:price};
	//campgroundsArr.push(newCampground);
	campground.create(newCampground,function(err,camp){
		if(err){
			req.flash("error","Something went wrong");
			console.log(err);
		}else{
			req.flash("success","Successfully added Campground");
			//console.log(camp);
			res.redirect("/campgrounds");
		}
	});
	
});


router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
	var id = req.params.id;
	
	campground.findById(id).populate("comments").exec(function(err,camp){
		if(err){
			req.flash("error","Something went wrong");
			console.log(err);
		}else{
			
			//console.log(camp);
			//res.send(id);
			res.render("campgrounds/show",{camp:camp});
		}
	});
	
});

// EDIT ======================

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	campground.findById(req.params.id,function(err,foundCamp){
		if(err){
			res.redirect("/campgrounds");
		}else{
			console.log(foundCamp);
			res.render("campgrounds/edit",{foundCamp:foundCamp});
		}
	})
		
});

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,updatedCamp){
		if(err){
			//console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//=======================================

// DELETE =================

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			req.flash("success","Campground Deleted ");
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;