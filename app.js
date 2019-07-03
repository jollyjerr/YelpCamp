var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgrounds = [
    { name: "Camp1", image: "https://live.staticflickr.com/3181/2745088502_582d1f061e_m.jpg" }, { name: "Camp2", image: "https://farm1.staticflickr.com/213/520557069_c2249a2689_b.jpg" }, { name: "Camp3", image: "https://farm3.staticflickr.com/2491/3892588497_a8c9c2ec2e_b.jpg" }
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