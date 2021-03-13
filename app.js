require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });


const itemschema = mongoose.Schema({
     title: String,
     content: String,
     writer: String,
     field: String
});
const Item = mongoose.model("Item", itemschema);

let intern = ["Outreachy", "SheIntuit by Intuit", "GSoC Systers Community", "GirlScript Summer of Code", "Rails Girls Summer of Code", "Hack@Home by Atlassian", "She Codes by Indeed", "DevelopHER by Twitter", "Google STEP Intern", "Microsoft Codess", "Facebook University for Coders", "American Express Makeathon", "Amazon AmazeWow", "CODHERS by Adobe", "Microsoft Garage Internship program", "Duolingo Thrive Program",
     "Microsoft New Technologies Program", "DEShaw Fellowship Program", "VISA Code UR Way", "Wintathon"];


let scholar = ["Grace Hopper Celebration (GHC)", "Grace Hopper Celebration India (GHCI)", "Adobe India Women in Technology Scholarship", "Women Techmakers Scholarship", "RedHat Women in Open Source Award", "Linux Foundation Training (LiFT) Scholarship", "Western Digital STEM Scholarship", "Internshala Scholarship: Career Scholarship for Girls", "Goldman Sachs Global Scholarship and Mentorship Program",
     "Pragati Scholarship: AICTE Scholarship Scheme to Girl Child", "L'Oreal India for Young Women in Science Scholarship", "Qualcomm WeTech Scholarship", "Palantir Global Impact Scholarship", "Society of Women Engineers Scholarship", "Google Conference and Travel Scholarship", "Venkat Panchapakesan Memorial Scholarship", "Dreams Scholarship Fund", "IIT Bombay Research Internship Award", "Nutanix Wit Scholarship", "Diversify Tech Education Scholarships"];

let research = ["Globalink Research Internship",
     "USC Viterbi Summer Research Program",
     "Charpak Labs Scholarship",
     "SN Bose Scholars Program",
     "Shastri Student Internship Project",
     "IBM Extreme Blue Technical Leadership Program",
     "IIT Madras Fellowship Program"];


let countries = [];
countries["United Kingdom"] = "gb";
countries["Austria"] = "at";
countries["Australia"] = "au";
countries["Brazil"] = "br";
countries["Canada"] = "ca";
countries["Germany"] = "de";
countries["France"] = "fr";
countries["India"] = "in";
countries["Italy"] = "it";
countries["Netherlands"] = "nl";
countries["New Zealand"] = "nz";
countries["Poland"] = "pl";
countries["Russia"] = "ru";
countries["Singapore"] = "sg";
countries["United States"] = "us";
countries["South Africa"] = "za";


app.post("/readBlog", function (req, res) {
     Item.find({}, function (err, foundItems) {
          if (!err) {
               res.render("readBlog", {posts: foundItems});
          }
          else {
               console.log("error");
          }
     });
});


app.post("/jobSearch", function (req, res) {

     res.render("jobSearch");
});


app.get("/error", function (req, res) {
     res.render("error");
})

app.post("/jobs", function (req, res) {
     const api_key = process.env.API_KEY;
     const api_id = process.env.API_ID;
     const country = req.body.country;
     const location = req.body.location;
     const category = req.body.category;
     const results_per_page = 50;
     let ct = countries[country];
     const url = `https://api.adzuna.com/v1/api/jobs/${ct}/search/1?results_per_page=${results_per_page}&app_id=${api_id}&app_key=${api_key}&what=${category}&where=${location}`;

     https.get(url, function (response) {
          console.log(response.statusCode);
          var temp = [];
          let stockData = "";
          response.on("data", function (data) {

               stockData += data;
          });

          response.on("end", function () {
               let jobInfo = JSON.parse(stockData);
             
               if (response.statusCode == 200)
                    res.render("jobs", { jobInfo: jobInfo.results });
               else
                    res.redirect("error");

          });
     });


});


app.post("/blog", function (req, res) {
     res.render("blog");
});




app.get("/", function (req, res) {

     res.render("home");
});

app.post("/internship", function (req, res) {
     res.render("internship", { intern: intern });
});

app.post("/scholarship", function (req, res) {
     res.render("scholarship", { scholar: scholar });
});

app.post("/research", function (req, res) {
     res.render("research", { research: research });
});

app.post("/home", function (req, res) {
     res.render("home");
});

app.post("/compose", function (req, res) {
     res.render("compose");
});



app.post("/composeBlog", function (req, res) {
     var tit = req.body.num1;
     var cont = req.body.num2;
     var writer = req.body.writer;
     var field = req.body.field;
     const t = new Item({
          title: tit,
          content: cont,
          writer : writer,
          field : field
     });

     t.save(function (err) {

          if (!err) {

               res.redirect("/");

          }

     });
   
});


app.post("/about", function (req, res) {
     res.render("about");
});

app.post("/contact", function (req, res) {
     res.render("contact");
});





app.listen(3000, function () {
     console.log("Server started on port 3000");
});
