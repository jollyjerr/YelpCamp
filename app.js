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
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//TESTS
Campground.create({
    name: "Circle Park Campground",
    image: "https://static1.squarespace.com/static/570cea31859fd01b8faced0c/t/5775c8452e69cff5b8fe568c/1467336807087/http%3A%2F%2Fwww.the-openroad.com+Big+Horn+National+Forest"
}, function(err, campground) {
    if (err) {
        console.log(err);
    } else {
        console.log("Newly created campground: ");
        console.log(campground);
    }
});

//ROUTES
var campgrounds = [
    { name: "South Fork Campground", image: "http://4.bp.blogspot.com/-wCDfRat_Nlo/U-UGlxdwi9I/AAAAAAAABSE/qqFJIWleunQ/s1600/01.JPG" },
    { name: "Circle Park Campground", image: "https://static1.squarespace.com/static/570cea31859fd01b8faced0c/t/5775c8452e69cff5b8fe568c/1467336807087/http%3A%2F%2Fwww.the-openroad.com+Big+Horn+National+Forest" },
    { name: "Sitting Bull Campground", image: "https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprd3844268.jpg" }
];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image };
    campgrounds.push(newCampground);
    //redirect to the campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(3000, function() {
    console.log("YelpCamp is running on port 3000");
});