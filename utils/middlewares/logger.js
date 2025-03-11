const { writeToLog } = require("../../services/logger")

const startLogger=(req,res,next)=>{
    const logger={
        status:"start",
        time:new Date().toISOString(),
        request:req.url,
        method:req.method
    }
    writeToLog(logger)
    next()
}

const endLogger=(req,res)=>{
  const logger={
    status:'end',
    time:new Date().toISOString(),
    request:req.url,
    method:req.method,
    response:res.locals['response']
  }
  writeToLog(logger)
}

module.exports={startLogger,endLogger}