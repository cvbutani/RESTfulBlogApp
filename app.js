var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/blog_app");
//  APP CONFIGURATION
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIGURATION
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: 
    {
        type: Date, 
        default: Date.now
    }
});

var Blog = mongoose.model("Blog", blogSchema);

//  RESTFUL ROUTES

// Blog.create({
//     title: "Nissan Altima 2019",
//     image: "https://www.nissan.ca/content/dam/nissan/future-and-concept-vehicles/2019-altima/2019-nissan-all-new-altima-overview-scarlet-ember.jpg",
//     body: "The all-new Altima features Intelligent All-Wheel Drive for a new kind of capability you never thought you could get in a sedan."
// });

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err,blogs){
        if(err) {
            console.log("ERROR !!")
        } else {
            res.render("index", {blogs:blogs});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Connected to server !!!");
});