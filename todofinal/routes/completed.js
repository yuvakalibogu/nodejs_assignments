const express=require('express')
const router=express.Router();
const User=require('../userSchema')
const filterType='completed';
router.get('/',async(req,res)=>{
    const filterType='completed';
    const tasks=await User.find({isCompleted:true});
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
    res.redirect("/completed");
})
router.get('/delete/:id',async(req,res)=>{
    let id=req.params.id;
    await User.deleteOne({_id:id});
    res.redirect('/completed')
})
router.get('/strike/:id',async(req,res)=>{
    const bool = (await User.findById(req.params.id)).isCompleted;
    await User.updateOne({_id : req.params.id}, { $set : { isCompleted : !bool }});
    res.redirect('/completed');
})
router.get('/clearcompleted',async(req,res)=>{
    await User.deleteMany({isCompleted:true});
    res.redirect('/completed');
})
module.exports=router;