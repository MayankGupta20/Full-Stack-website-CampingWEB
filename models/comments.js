var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
	author:{
		id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
		},
		username:String
		
	},
	text:String
});

var comments = mongoose.model("comments",commentSchema);

module.exports= comments;