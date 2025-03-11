const express=require('express')
const { createPallete, getAllPalletes } = require('../modules/pallete')
const { getAll } = require('../services/DB/read')
const router=express.Router()

router.get('/all',(req,res,next)=>{
    try{
    const {skip=0,count=35}=req.query
    const response=getAllPalletes({skip,count})
    res.locals['response']=200
    res.status(200).json(response)
    }
    catch(err){
        console.log(error)
        res.locals['response']=500
        res.status(500).send(err.message)
    }
    next()
})

router.post('/create',express.json(),(req,res,next)=>{
    try{
    const {colors}=req.body
    const newPallete=createPallete({colors,userName:'shifi'})
    res.locals['response']=201
    res.status(201).json(newPallete) 
    }
    catch(error){
        console.log(error)
        res.locals['response']=500
        res.status(500).send(error.message)
    }
    next()
})
module.exports=router