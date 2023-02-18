const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname+"/date.js")

const app = express();

var items = [];
var workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/", function (req, res) {
  var item = req.body.newListItem;
  console.log(item);

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", {
    listType: "Work List",
    newListItem: workItems,
  });
});

app.get("/", function (req, res) {
  console.log("reached");
  var day=date();
  res.render("list", { listType: day, newListItem: items });
});

app.listen("3000", function () {
  console.log("Started port at 3000");
});
