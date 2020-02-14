//boiler plate

var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var cheerio = require("cheerio");
var axios = require("axios");

//port
var PORT = 3000;

//require models
var db = require("./models");

//initialize  Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Make public a static folder
app.use(express.static("public"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");
  
// Routes

// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
    
    axios.get("https://www.gameinformer.com/").then(function(response) {
      // load into cheerio and create $ shorthand
      var $ = cheerio.load(response.data);
  
      // Grabs every h2 within an article tag
      //find gameinformer's tags we need. 
      $("article h2").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        //Saves the title and href as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
        result.summary = $(this)
        .find("p.promo-summary")
  
        db.Article.create(result)
          .then(function(dbArticle) {
           
            console.log(dbArticle);
          })
          .catch(function(err) {
           
            console.log(err);
          });
      });
  
      // Sends user a message 
      res.send("Scrape Complete");
    });
  });
  
  // Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    // grabs all of the articles
    db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
  });

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});