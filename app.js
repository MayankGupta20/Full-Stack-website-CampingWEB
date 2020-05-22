var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var campground = require("./models/campground");
var seedDB = require("./seed");
var comment = require("./models/comments");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");

var campgroundRoute = require("./routes/campgroundRoute");
var commentRoute = require("./routes/commentRoute");
var indexRoute = require("./routes/indexRoute");

var port = process.env.PORT || 3000;

//mongolab link to connect
//mongodb+srv://mayank1:<password>@cluster0-nnjxu.mongodb.net/test?retryWrites=true&w=majority

//package for flash messages connect-flash
var flash = require("connect-flash");

//seedDB();


//mongoose.connect('mongodb://localhost/YelpCamp' , {useNewUrlParser: true});
mongoose.connect('mongodb+srv://mayank1:mayank@123@cluster0-nnjxu.mongodb.net/test?retryWrites=true&w=majority' , {useNewUrlParser: true});


/*campground.create({
	name:"night out",
	image:"https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c7d2b7ed6974bc650_340.jpg",
	description:"Campground in lapse of nature under the beautiful sky and stars",
	comments:"this is comment "
},function(err,campground){
	if(err){
		console.log(err);
	}else{
		console.log("New campground added ");
		console.log(campground);
	}
})
*/
app.use(flash()); 

app.use(methodOverride("_method"));


app.use(require("express-session")({
	secret:"This text is used to encode0 and decode data in session , can put any text",
	resave:false,
	saveUnitialized:false
}));


app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

/*var campgroundsArr= [
					{name:"night camps",image:"https://pixabay.com/get/52e8d4444255ae14f6da8c7dda793f7f1636dfe2564c704c7d2b7fd69744c15a_340.jpg"},
					{name:"summer camp ",image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2b7fd69744c15a_340.jpg"},
					{name:"night sky",image:"https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2b7fd69744c15a_340.jpg"},
					{name:"teepee",image:"https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c7d2b7fd69744c15a_340.jpg"},
					{name:"nature",image:"https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c7d2b7fd69744c15a_340.jpg"},
					{name:"pixabay",image:"https://pixabay.com/get/52e8d4444255ae14f6da8c7dda793f7f1636dfe2564c704c7d2b7fd69744c15a_340.jpg"}
					//,{name:"my photo",image:"‪assets\/myphoto.jpg"}
				]
*/
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//this function is called on every route because we need to send 
// currentUser variable from each route so instead of doing manually 
// on every route we can do it like this i.e app.use()
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

// This /campgrounds will get added in front of every campgroundRoute .
app.use("/campgrounds",campgroundRoute);
//but to acces id parameter we need to do mergeParams : true in express.Route else it will not be able to find access id 
app.use("/campgrounds/:id/comments",commentRoute);
app.use(indexRoute);

app.listen(port,function(){
	console.log("Server running ");
});