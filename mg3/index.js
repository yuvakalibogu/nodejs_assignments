const express = require("express")
var app = express();
const User = require("./userSchema")
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect('mongodb+srv://yuva:2115@cluster0.ixpxg.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("DB Connection Success"))
    .catch((err) => console.log(err.message));
app.get('/', async (req, res) => {
    let tasks = await User.find({});
    res.render('index', {
        tasks: tasks
    });
})
app.post("/submit", async (req, res) => {
    // res.send(req.body);
    const data = await User.create({
        name: req.body.name,
        email: req.body.email,
        number: parseInt(req.body.number),
        address: req.body.address
    });
    await data.save();
    res.redirect("/");
})
app.listen(4007);

app.get("/edit/:id", async (req, res) => {
    let id = req.params.id;
    const objData = await User.find({_id : id});
    console.log(objData);
    const tasks=await User.find({});
    res.render('edit', {objData : objData});
})

app.post('/edited/:id', async(req, res) => {
    // res.send(req.params.id);
    let id = req.params.id;
    await User.updateOne({ _id : id}, { $set: {name : req.body.name, email : req.body.email, number : req.body.number, Address : req.body.address}});
    res.redirect('/');
    // res.send('updated');
})


app.get("/delete/:id", async (req, res) => {

    let id = req.params.id;
    await User.deleteOne({
        _id: id
    });
    res.redirect('/');

})