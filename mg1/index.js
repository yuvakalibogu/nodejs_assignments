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

app.get('/', (req, res) => {
    res.render('index');
})
let array=[];
app.post("/submit",async(req, res )=>{
    // res.send(req.body);
    const data = await User.create({
        name:req.body.name,
        email:req.body.email,
        phoneNumber: parseInt(req.body.number),
        address:req.body.address
    });
    res.send(data);

})

app.listen(4005);