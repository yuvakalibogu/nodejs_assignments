const express=require("express")
var app=express();
const User=require("./userSchema")
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
app.use(express.static('public'));
app.use('css', express.static(__dirname + 'public/css'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb+srv://yuva:2115@cluster0.ixpxg.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("DB Connection Success"))
.catch((err) => console.log(err.message));

const allRouter=require('./routes/all');;
app.use('/all',allRouter);
const activeRouter=require('./routes/active');;
app.use('/active',activeRouter);
const completedRouter=require('./routes/completed');;
app.use('/completed',completedRouter);

app.get('/',(req,res)=>{
    res.redirect('/all')
})
app.listen(4000);