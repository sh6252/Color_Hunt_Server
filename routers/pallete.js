const express=require('express')
const router=express.Router()

router.get('/all',(req,res)=>{
    const {skip=0,count=35}=req.query
    res.status(200).json([{"🐵🙊🙉🙈":"🐵🙊🙉🙈",skip,count}])
 
})

router.post('/create',express.json(),(req,res)=>{
    const {colors}=req.body
    res.status(201).json({...req.body,id:1}) 
})
module.exports=router