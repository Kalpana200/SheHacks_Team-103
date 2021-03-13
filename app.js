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

let intern = ["Outreachy","March-April","Age-18+","https://www.outreachy.org/", "https://youtu.be/lRegecT11k0" ,"Rails Girls Summer of Code","March-Sep","Age-18+","https://railsgirlssummerofcode.org/","https://www.youtube.com/watch?v=4M-IVU-v5FM", "She Codes by Indeed","Sep-Jan","Women residing in India","https://dare2compete.com/o/shecodes-indeed-indeed-143669","https://youtu.be/ZadTb6yOYEQ", "Google STEP Intern","May-August","1st or 2nd year bachelor's","https://buildyourfuture.withgoogle.com/programs/step/","https://youtu.be/aitUS0IAyQU", "Microsoft Codess","Sep-June","2nd Year Female students in four year Undergraduate program","https://www.codess.net/about-codess/","https://youtu.be/sDGz-ZB1TOA", "Facebook University for Coders","Aug-Oct","students from underrepresented communities","https://www.facebook.com/careers/FBUEngineering","", "American Express Makeathon","May-July","Women currently in bachelor or master degree. ", "https://www.noticebard.com/american-express-makeathon-2021/" , "https://www.youtube.com/watch?v=LX1iB2jTn9k", "Amazon AmazeWow","April-May(Registration), June(Interviews)","Females with degree in B.tech/BE/Masters with GPA>6.5","https://www.stumagz.com/internship-opportunity-with-amazewow-by-amazon/","https://youtu.be/WB6z2Qk_-qU", "Adobe India Women in Tech","Aug-Sep"," student in a 4 year BE / B.Tech education program or an Integrated ME/MS/MTech program","https://research.adobe.com/adobe-india-women-in-technology-scholarship/","https://youtu.be/eF6ek2j5gfE", "Microsoft Garage Internship program","Starts from may","A bachelor’s degree in engineering, CS or related field","https://www.microsoft.com/en-us/garage/about/" ,"https://www.youtube.com/watch?v=zWtt0gstb4I", "Duolingo Thrive Program","June-August","2nd year ug student","https://startup.jobs/duolingo-thrive-intern-software-engineering-at-duolingo-2", "https://www.youtube.com/watch?v=jFFxxLStOVA",
     "Microsoft New Technologists Program","June– August","1st, 2nd year student. Age-18+","https://newtechnologists.com/","", "DEShaw Fellowship Program","Many fellowships available","According to fellowships","https://fellowships.deshaw.com/","https://youtu.be/QLj2-jvz974","GirlScript Summer of Code","March-June","For everyone" ,"https://gssoc.girlscript.tech/","https://www.youtube.com/watch?v=o8YFE6uEx6I",  "VISA Code UR Way","November","Women only","https://assessment.hackerearth.com/challenges/hiring/visa-code-your-way-2019/","https://youtu.be/AA7we1OR0Y4", "Wintathon","January","3rd or 4th Year BTech/BE, 1st / 2nd Year M.Tech","https://wintathon2020.splashthat.com/","https://www.youtube.com/watch?v=RuRe_5KaLOM"];


let scholar = ["Grace Hopper Celebration (GHC)","July-November","18+ Women","https://ghc.anitab.org/","https://youtu.be/z4TiEOnWcaU", "Grace Hopper Celebration India (GHCI)","Feb-March","an undergraduate student who is enrolled or in the final year of their degree course","https://anitab.org/india/","https://youtu.be/J_kZxyJDPBc", "Women Techmakers Scholarship","March-May","undergraduate or graduate students","https://www.womentechmakers.com/","https://www.youtube.com/watch?v=5h0TfQ7NvTg", "RedHat Women in Open Source Award","April","Women in Open source Community","https://www.redhat.com/en/about/women-in-open-source","https://www.youtube.com/watch?v=k0IdJo0MFHw", "Linux Foundation Training (LiFT) Scholarship","April-May","Financially disadvantaged women","https://www.linuxfoundation.org/en/about/diversity-inclusivity/lift-scholarships/","https://youtu.be/cv-B7tx3NGE", "Western Digital STEM Scholarship","January-May"," students with a 3.0 GPA on a 4.0 scale ","https://www.westerndigital.com/company/corporate-philanthropy/scholarship-programs", "https://youtu.be/03bG_Z_W8vY","Internshala Scholarship: Career Scholarship for Girls","January-March","Girls (Indian nationals) between the ages of 17 to 23 years","https://blog.internshala.com/2020/12/internshala-career-scholarship-for-girls-2021/","https://youtu.be/L15-PMjn7bs", "Goldman Sachs Global Scholarship and Mentorship Program","April-October","Current undergraduate student in her second or third year of studies","https://www.iie.org/Programs/WeTech/STEM-Scholarships-for-Women/Goldman-Sachs-Scholarship","https://youtu.be/wrndJRWsP0A",
     "Pragati Scholarship: AICTE Scholarship Scheme to Girl Child","Not-fixed","Two girls per family.Annual family income<INR 8 lakh","https://www.buddy4study.com/article/pragati-scholarship" , "https://www.youtube.com/watch?v=ThRNhPmBMMc", "L'Oreal India for Young Women in Science Scholarship","October deadline","12 in science stream with 85%, annual family income < 4 lakhs, max 19yrs on 31/05","https://www.loreal.com/en/india/articles/commitments/the-india-for-young-women-in-science-scholarship-programme/","https://youtu.be/efqyggcu9wA", "Qualcomm WeTech Scholarship","Nov-Jan (Applications), Feb(Winner),March-Aug(Intern period)","Current ug student in her 2nd or 3rd year of studies,seeking a degree in Engineering, CS, ICT or other STEM-related field","https://www.iie.org/en/Programs/WeTech/STEM-Scholarships-for-Women/Qualcomm-Global-Scholars-Program","https://youtu.be/x3S5zx4z_i8", "Society of Women Engineers Scholarship","Feb (Sophomores and above), March-May(Freshmen)","Applicants must be planning to study an ABET-accredited program in engineering, technology, or computing.","https://scholarships.swe.org/applications/login.asp","https://youtu.be/2PRCL0WlCAM", "Google Conference and Travel Scholarship","","student enrolled with a recognized university in India who is in need of conference travel funds","https://buildyourfuture.withgoogle.com/scholarships/google-travel-scholarships/","https://youtu.be/e4twefC7Qpw", "Venkat Panchapakesan Memorial Scholarship","September deadline"," undergraduate or graduate student","https://www.scholarship4study.com/google-venkat-panchapakeshan-scholarship/","https://youtu.be/P_XNFUCiTOg", "1000 Dreams Scholarship Fund","December to April","women attending high school or a two-year or four-year college/university in the United States","https://www.growyourgiving.org/scholarships/1000-dreams-scholarship-fund/","https://youtu.be/pUnImuoZ3ww", "IIT Bombay Research Internship Award","Aug-Sep (Applications), October(Interviews), Jan-June(Intern Period)","Available for specific research projects","https://www.ircc.iitb.ac.in/fellowship/","https://www.youtube.com/watch?v=ZXsNLHwEcZY", "Nutanix Wit Scholarship","November-September","Female undergraduate or graduate pursuing a degree in CS, CE and EE. Minimum 3.5 GPA out of 4.","https://www.nutanix.com/scholarships","https://www.youtube.com/watch?v=UemuzGSrQP4","Diversify Tech Education Scholarships","Many scholarships given","Women only","https://www.diversifytech.co/education-scholarships","https://www.youtube.com/watch?v=Ug0EkMhVYE0&t=20s"];

let research = ["Globalink Research Internship","July to September: International students submit applications and select research projects from the online database.Review of student applications from October to December.","https://www.mitacs.ca/en/programs/globalink/globalink-research-internship" , "https://www.youtube.com/watch?v=55ZwlfXnEho",
     "USC Viterbi Summer Research Program","Important period : June to August. Eligibility : Strong academic background (GPA of 3.5 or higher is recommended) in the fields of engineering, math, or hard science (biology, chemistry, physics)","https://viterbischool.usc.edu/globalization/viterbi-india/summer-programs-india/" , "https://www.youtube.com/watch?v=NkGYzdnQbSg",
     "Charpak Labs Scholarship","Important period : December to March. Eligibilty : Applicant must be less than 30 years of age.","https://www.inde.campusfrance.org/charpak-lab-scholarship","https://www.youtube.com/watch?v=rLzoBaVZVas",
     "SN Bose Scholars Program","Application opens in the month of September and ends in the October. The period of internship starts from the mid of May.","https://www.iusstf.org/program/sn-bose-scholars-program", "https://www.youtube.com/watch?v=qoovetrq54Y",
     "Shastri Student Internship Project","Timeframe - January to April(next year). The duration of internship is 3 months.","https://www.shastriinstitute.org/Shastri_Student_Internship_Project" ,"https://www.youtube.com/watch?v=QgOW8ZtIgJ8",
     "IBM Extreme Blue Technical Leadership Program","12 rigorous weeks working in a fast-paced team environment. The time will fly by as you work on your projects, learn new skills, and access cutting-edge technology.","https://www.ibm.com/employment/extremeblue/" , "https://www.youtube.com/watch?v=WA3lvgHGsjI",
     "IIT Madras Fellowship Program","3rd year, 4th year (B.tech, B.sc) or 1st year (M.tech, Msc) students are eligible for this. Important period : May to July","https://sfp.iitm.ac.in/" , "https://www.youtube.com/watch?v=rha3Hya3vhQ"];


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
