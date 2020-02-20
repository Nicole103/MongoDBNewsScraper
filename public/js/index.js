$(document).ready(function(){

});

var API= {
    getScrape: function(){
        return $.$.ajax({
            type: "GET",
            url: "api/scrape"
            // data: "data",
            // dataType: "dataType",
            // success: function (response) {}
        });
    },
    init: function(){
        return $.ajax({
            type: "GET",
            url: "api/articles"
        });
    },
    getArticle: function(id){
        return $.ajax({
            type: "GET",
            url: "api/articles/"+id
        });
    },
    save: function(){
        return $.ajax({
            headers:{
                "Content-type": "application/json"
            },
            type: "POST",
            url: "api/saved",
            data: JSON.stringify(article)
        });
    },
    deleteArticle: function(id){
        return $.ajax({
            url: "api/articles/"+id,
            Type: "DELETE"
        });
    },
    deleteAllArticle: function(id){
        return $.ajax({
            url: "api/articles/",
            Type: "DELETE"
        });
    }
};
var newScrape = function(){
    $("#scrapeResults").empty();
    API.getScrape().then(function(data){
        API.init().then(function(data){
            if(data.length>0){
                var $arts = data.map(function(artic){
                    var $li = $("<li>"):
                    var saveBtn = $("<button>").addClass("btn btn-primary btn-sm").attr("type", "submit").attr("name", "action").text("Save Article");
                    var title = $("<div>").text(artic.title).addClass("collapsible-header");
                    var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                    var body = $("<div>").attr("data-id", artic._id).addClass("collapsible-body").append(span).append(saveButton);
    
                    $li.append(title).append(body);
    
                    return $li;
                });
                $("#scrapeResults").append($arts);
            }
            else {
                var $li = $("<li>");
    
                var title = $("<h5>").text("No More Articles. Get Scraping By Clicking The Button Above!").addClass("center-align");
    
                $li.append(title);
                $("#scrapeResults").append($li);
            }
        });
    });
};

//get articles

//delete all scrapped articles


//save article

//adding notes 