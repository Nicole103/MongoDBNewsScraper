var db = require("../models");

var axios = require("axios");

var cheerio = require("cheerio");
// Routes

// A GET route for scraping the echoJS website
app.get("/api/scrape", function(req, res) {
    
    axios.get("https://www.gameinformer.com/").then(function(response) {
      // load into cheerio and create $ shorthand
      var $ = cheerio.load(response.data);
  
      // Grabs every h2 within an article tag
      //find gameinformer's tags we need. 
      $(".article-body").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        //Saves the title and href as properties of the result object
        result.title = $(this)
          .find(".article-title")
          .text();
        result.link = $(this)
          .find(".article-title")
          .attr("href");
        result.summary = $(this)
        .find(".promo-summary");
  
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
app.get("/api/articles", function(req, res) {
    
    db.Article.find({})
    .then(function(dbArticle){
      console.log("dbArticle", dbArticle[0]);
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});


//clearing out articles
app.delete("/api/articles", function(req, res) {
   db.Article.remove({})
    .then(function(dbArticle){
      console.log("dbArticle", dbArticle[0]);
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

// clearing out saved
app.delete("/api/saved", function(req, res){
   db.Save.remove({})
    .then(function(dbArticle){
      res.json(dbArticle);
    })
    .catch(function(err){
      res.json(err);
    });
});

//clearing out notes
app.delete("/api/notes", function(req, res){
    db.Note.remove({})
     .then(function(dbArticle){
       res.json(dbArticle);
     })
     .catch(function(err){
       res.json(err);
     });
});

//saving articles
app.get("/api/saved", function(req, res){
    db.Save.find({})
     .then(function(dbArticle){
       res.json(dbArticle);
     })
     .catch(function(err){
       res.json(err);
     });
});

//finding specific article
app.get("/api/articles/:id", function(req, res) {
     db.Article.findOne({_id: req.params.id})
    .then(function(dbArticle){
      res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

//finding specific article from saved
app.get("/api/saved/:id", function(req, res){
   db.Save.findOne({_id: req.params.id})
   .populate("note")
    .then(function(dbArticle){
      res.json(dbArticle);
    })
    .catch(function(err){
      res.json(err);
    });
});

//removing specific article
app.delete("/api/articles/:id", function(req, res) {
    db.Article.remove({_id: req.params.id})
   .then(function(dbArticle){
     res.json(dbArticle);
   })
   .catch(function(err){
       res.json(err);
   });
});

//removing from saved
app.delete("/api/saved/:id", function(req, res){
  db.Save.remove({_id: req.params.id})
   .then(function(dbArticle){
     res.json(dbArticle);
   })
   .catch(function(err){
     res.json(err);
   });
});

//removing notes
app.delete("/api/notes/:id", function(req, res){
    db.Save.remove({_id: req.params.id})
     .then(function(dbNote){
       res.json(dbNote);
     })
     .catch(function(err){
       res.json(err);
     });
});

app.post("/api/saved", function(req, res){
    var result ={};
    result.title = req.body.title;
    result.link = req.body.link;
    result.summary = req.body.summary;

    db.Save.create(result)
    .then(function(dbSaved){
        console.log(dbSaved);
    })
    .catch(function(err){
        console.log(err);
    });
});

app.get("/articles/:id", function(req, res){
    db.Article.findOne({_id: req.params.id})
    .populate("note")
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

app.post("/api/notes/:id", function(req, res){
    db.Note.create(req.body)
    .then(function(dbNote){
        return db.save.findOneAndUpdate({_id:req.params.id}, {note: dbNote._id}, {new:true});
    })
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});
