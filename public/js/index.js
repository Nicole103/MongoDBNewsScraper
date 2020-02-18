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
                    var saveBtn = $("<button").addClass("btn btn-primary btn-sm").attr("type", "submit").attr("name", "action").text("Save Article");
                    
                })
            }
        })
    })
}