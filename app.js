var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//TESTS
// Campground.create({
//     name: "Circle Park Campground",
//     image: "https://static1.squarespace.com/static/570cea31859fd01b8faced0c/t/5775c8452e69cff5b8fe568c/1467336807087/http%3A%2F%2Fwww.the-openroad.com+Big+Horn+National+Forest",
//     description: "Circle Park Campground is an expansive hilly landscape with great mountain views. Be sure to drive around and look for the perfect campsite! Bring your own water!"
// }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Newly created campground: ");
//         console.log(campground);
//     }
// });

//ROUTES

app.get("/", function(req, res) {
    res.render("landing");
});

//index - display
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
});

//create - send form
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description };
    //push to database
    Campground.create(newCampground, function(err, newlyCamp) {
        if (err) {
            console.log(err);
        } else {
            //redirect to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//new - display form
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

//show - info for one campground
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template
            res.render("show", { campground: foundCampground });
        }
    });
});




app.listen(3000, function() {
    console.log("YelpCamp is running on port 3000");
});