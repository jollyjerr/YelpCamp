var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        { name: "Camp1", image: "https://live.staticflickr.com/3181/2745088502_582d1f061e_m.jpg" }, { name: "Camp2", image: "https://farm1.staticflickr.com/213/520557069_c2249a2689_b.jpg" }, { name: "Camp3", image: "https://farm3.staticflickr.com/2491/3892588497_a8c9c2ec2e_b.jpg" }
    ];
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.listen(3000, function() {
    console.log("YelpCamp is running on port 3000");
});