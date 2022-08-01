const express=require('express')
const router=express.Router();
const User=require('../userSchema')
const filterType='active';
router.get('/',async(req,res)=>{
    const filterType='active';
    const tasks=await User.find({isCompleted:false});
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
    res.redirect("/active");
})
router.get('/delete/:id',async(req,res)=>{
    let id=req.params.id;
    await User.deleteOne({_id:id});
    res.redirect('/active')
})
router.get('/strike/:id',async(req,res)=>{
    const bool = (await User.findById(req.params.id)).isCompleted;
    await User.updateOne({_id : req.params.id}, { $set : { isCompleted : !bool }});
    res.redirect('/active');
})
router.get('/clearcompleted',async(req,res)=>{
    await User.deleteMany({isCompleted:true});
    res.redirect('/active');
})
module.exports=router;