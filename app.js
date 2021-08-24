//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
const _core =require("lodash/core");
const fp=require("lodash/fp");
const array=require("lodash/array");
const object=require("lodash/fp/object");
const at=require("lodash/at");
const curryN=require("lodash/fp/curryN");

const homeStartingContent = "The best ideas can change who we are. Daily Journal is where those ideas take shape, take off, and spark powerful conversations. We’re an open platform where over 100 million readers come to find insightful and dynamic thinking. Here, expert and undiscovered voices alike dive into the heart of any topic and bring new ideas to the surface. Our purpose is to spread these ideas and deepen understanding of the world.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();



let posts=[];


// function ellipsify (str) {
//   if (str.length > 100) {
//       return (str.substring(0, 100) + "...");
//   }
//   else {
//   return str;
// }
// }





app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){
  // posts.forEach(function(post){
  //   post.body=ellipsify(post.body);
  // })
  res.render("home",{
    text:homeStartingContent ,
    posts:posts
    });
  
});

app.get("/posts/:blog",function(req,res){
  posts.forEach(function(post){
    const requestedTitle=_.lowerCase(req.params.blog);
    const composedTitle=_.lowerCase(post.title);
    if(requestedTitle===composedTitle)
    res.render("post",{postHeading: post.title, postText: post.body})
    // else
    // res.write("Oops!Error 404!")
  })  
});



app.get("/about", function(req,res){
  res.render("about", {textAbout:aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {textContact: contactContent});
});

app.get("/compose", function(req,res){
  
  res.render("compose");
  
});

app.post("/compose", function(req,res){
  var post={
    title: req.body.postTitle,
    body: req.body.postPost
  };
  posts.push(post);
  res.redirect("/");
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
