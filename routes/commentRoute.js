
//=======Comments=========//
var express = require("express");
var router = express.Router({mergeParams:true});
var comment = require("../models/comments");
var campground = require("../models/campground");
var middleware = require("../middleware/index");


//=====middleware=========
/*function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		console.log("User found authenticated");
		next();
	}else{
		res.redirect("/login");
	}
	
}
*/
//checkCommentOwnership=============


//========================

router.get("/new",middleware.isLoggedIn,function(req,res){
	var id = req.params.id;
	//console.log(id);

	campground.findById(id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			//console.log(campground);
			res.render("comments/new",{campground:campground});
		}
	})
	
});

router.post("/",middleware.isLoggedIn,function(req,res){
	campground.findById(req.params.id,function(err,camp){
		if(err){
			//console.log(err);
			res.render("campgrounds/show");
		}else{
			//console.log(" User info : : "+req.user);
			var new_comment = {
				text:req.body.text,
				author:{
					id:req.user._id,
					username:req.user.username
				}
			};
			comment.create(new_comment,function(err,cmt){
				if(err){
					req.flash("error","Something went wrong");
					//console.log(err);
				}else{
					//console.log(cmt);
					//console.log(camp);
					camp.comments.push(cmt);
					//console.log(camp);
					camp.save();
					req.flash("success","Comment added ");
					res.redirect("/campgrounds/"+camp._id);
				}
			})
			
			

		}
	})
	
})

//Comment Edit Route ======================
router.get("/:cmt_id/edit",middleware.checkCommentOwnership,function(req,res){
	comment.findById(req.params.cmt_id,function(err,cmt){
		res.render("comments/edit",{cmt:cmt,campground_id:req.params.id});
	})
	

});

router.put("/:cmt_id/edit",middleware.checkCommentOwnership,function(req,res){

	comment.findByIdAndUpdate(req.params.cmt_id,{text:req.body.text},function(err,updated_comment){
		if(err){
			//console.log(err);
			req.flash("error","Something went wrong");
		}else{
			//console.log(updated_comment);
			res.redirect("/campgrounds/"+req.params.id);

		}
	})
	
});

// Delete comment==========================

router.delete("/:cmt_id",middleware.checkCommentOwnership,function(req,res){
	comment.findByIdAndRemove(req.params.cmt_id,function(err){
		if(err){
			req.flash("error","Something went wrong");
			res.redirect("/campgrounds/"+req.params.id);
		}else{
			req.flash("success","Comment deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
});

module.exports = router;

/*
Comments

app.get("/comments/:id",function(req,res){
	var id = req.params.id;
	res.render("newComment",{id:id});
});

app.post("/comments/:id",function(req,res){
	var id = req.params.id;
	var author = req.body.author;
	var comment = req.body.comment;
	comments.create({
		author:author,
		text:comment
	},function(err,cmt){
		if(err){
			console.log(err);
		}else{
			console.log("comment created");
			console.log(cmt);
				campground.findById(id,function(err,camp){
					if(err){
					console.log(err);
					}
					else{
						console.log(camp);
						camp.comments.push(cmt);
						}
				});

			res.redirect("/campgrounds/:id");
		}
	});


});*/
