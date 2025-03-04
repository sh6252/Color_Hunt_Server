const startLogger=(req,res,next)=>{
    const logger={
        time:new Date().toISOString(),
        request:req.url,
        method:req.method
    }
    console.log(logger)
    next()
}

module.exports={startLogger}