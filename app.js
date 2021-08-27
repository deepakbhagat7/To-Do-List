const express = require("express");
const bodyParser = require("body-parser");
var ejs = require("ejs");

var items =["Wake Up", "Go and hit the Gym"];
let workItems = [];

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.set('view engine', 'ejs');

app.get("/", function (req,res) {
    var today = new Date();
    var currentDay = today.getDay();
    var options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US", options)
   
    res.render("list", {listTitle: day, newListItems: items});
   
});
app.post("/", function (req,res) {
    item= req.body.newItem;
    if (req.body.list === "work") {
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item);
    res.redirect("/")
    }
    
})

app.get("/work", function (req,res) {
    res.render("list", {listTitle:"work", newListItems: workItems});
});

app.post("/work", function (req,res) {
    let item  = res.body.newItem;
    workItems.push(items);
    res.redirect("/work");
});
app.get("/about", function (req,res) {
    res.render("about");
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});

   