const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { title } = require("process");

//Setting up server
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/RestApiWiki", { useNewUrlParser: true })

//schemas
const articleSchema = {
    title: String,
    content: String
  }
const Article = mongoose.model("Article", articleSchema);


// index page
app.get('/', function(req, res) {

    Article.find({}, (err, result) => {
     res.render('index', { article: result});

    })
    
});


// article API
app.route("/articles")
    .get(function(req, res) {

        Article.find({}, (err, result) => {
           res.send(result);
        })
        
    })
    .post((req,res)=>{
        console.log(req.body.title)
        console.log(req.body.content)
    
        const newArticle = new Article ({title:req.body.title, content:req.body.content});
        newArticle.save(function(err){
            if (err){
               res.send(err)
            } else {
                res.send("Bravo!!!")
            }
        });
    })
    .delete((req,res)=> {

        Article.deleteMany(function(err) {
            if(err) {
                res.send(err);
            } else {
                res.send("Deleted all articles")
            }
        })
    });



app.route("/articles/:something")
    .get((req,res)=>{
        Article.findOne({title: req.params.something}, (err, result) => {
            if(result) {
                res.send(result)
            } else {
                res.send("No article with that title")
            }
            
        })
        
    })
    .put((req,res) => {
        Article.updateOne({title: req.params.something}, {title: req.body.title, content: req.body.content}, (err) =>{
            if(!err){
                res.send("Article Updated!")
            }
        })
    })
    .patch((req,res)=> {
        Article.updateOne({title: req.params.something}, {title: req.body.title, content: req.body.connect}, (err) =>{
            if(!err){
                res.send("Article Updated with patch!")
            }
        })
    })
// put and patch work the same way (even tho put shoud overwrite)
// carful with spaces (%20) question marks and others on title
    .delete((req,res) => {
        Article.deleteOne({title:req.params.something}, (err)=> {
            res.send("Deleted this article!")
        })
    });





app.listen(3000);
