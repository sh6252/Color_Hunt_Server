const express=require('express')
const { createPallete } = require('../modules/pallete')
const { getAll } = require('../services/DB/read')
const router=express.Router()

router.get('/all',(req,res)=>{
    const {skip=0,count=35}=req.query
    res.status(200).json([])
 
})

router.post('/create',express.json(),(req,res)=>{
    try{
    const {colors}=req.body
    const newPallete=createPallete({colors,userName:'shifi'})
    res.status(201).json(newPallete) 
    }
    catch(error){
        console.log(error)
        res.status(500).send(error.message)
    }
})
module.exports=router