const express=require('express')
const router=express.Router();
const User=require('../userSchema')
const filterType='all';
router.get('/',async(req,res)=>{
    const filterType='all';
    const tasks=await User.find({});
    const count=await User.find({isCompleted:false}).count();
    res.render('index.ejs',{tasks : tasks,filterType:filterType,count:count});
})
router.post("/submit",async(req, res )=>{
    // res.send(req.body);
    
    const data = await  User.create({
        name:req.body.name,
        isCompleted:false
    });
    await data.save();
    res.redirect("/");
})
router.get('/delete/:id',async(req,res)=>{
    let id=req.params.id;
    await User.deleteOne({_id:id});
    res.redirect('/')
})
router.get('/strike/:id',async(req,res)=>{
    const bool = (await User.findById(req.params.id)).isCompleted;
    await User.updateOne({_id : req.params.id}, { $set : { isCompleted : !bool }});
    res.redirect('/');
})
router.get('/clearcompleted',async(req,res)=>{
    await User.deleteMany({isCompleted:true});
    res.redirect('/');
})
module.exports=router;