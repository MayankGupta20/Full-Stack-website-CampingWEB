var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment = require("./models/comments");

var data = [
	{
		name:"First",
		image:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	},
	{
		name:"Second",
		image:"https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"first camp description"
	},
	{
		name:"Third",
		image:"https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"first camp description"
	}
]

function seedDb(){
	campground.remove({},function(err){
		if(err){
			console.log("error occured while removing campgrounds ");
		}else{
			/*console.log("Removed Campgrounds ");
			data.forEach(function(camp){
				campground.create(camp,function(err,newCamp){
					if(err){
						console.log("Error occured while create new camp ");
					}else{
						//console.log(newCamp);
						comment.create({
							text:"first comment ",
							author:" Mayank "
						},function(err,cmnt){
							if(err){
								console.log("error in creating comment ");
							}else{
								//console.log(cmnt);
								newCamp.comments.push(cmnt);
								newCamp.save();
								console.log("Comment added to campground");
								//console.log(newCamp);
							}
						})
					}
				})
			})
		*/}
	});
}

module.exports = seedDb;