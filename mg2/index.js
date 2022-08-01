const express=require("express")
var app=express();
const User=require("./userSchema")
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb+srv://yuva:2115@cluster0.ixpxg.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("DB Connection Success"))
.catch((err) => console.log(err.message));
let task=[];
app.get('/', async(req, res) => {
    let tasks = await User.find({});
    res.render('index.ejs', {tasks : tasks});
})
app.post("/submit",async(req, res )=>{
    // res.send(req.body);
    const data = await  User.create({
        name:req.body.name,
        email:req.body.email,
        phoneNumber: parseInt(req.body.number),
        address:req.body.address
    });
    await data.save();
    res.redirect("/");
})
app.listen(4000);