var mongoose = require("mongoose");
var campgroundSchema = mongoose.Schema({
	name:String,
	image:String,
	price:String,
	description:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	},
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"comments"
	}]
});

module.exports = mongoose.model('campground',campgroundSchema);