const express = require('express')//פונקציות בשביל שהשרת יעבוד
const palleteRouter=require('./routers/pallete')
const { startLogger } = require('./utils/middlewares/logger')

const app = express()//בנית אובייקט מהטיפוס

app.use(startLogger)

app.get('/', (req, res) => {
    res.status(200).send('❤️❤️❤️❤️❤️❤️❤️❤️my server!❤️❤️❤️❤️❤️❤️❤️❤️')
})

app.use('/pallete',palleteRouter)

app.get('/colors/:color',(req,res)=>{
    res.status(200).send(`🙈🙉🙊🐵 you selected ${req.params.color} 🐵🙊🙉🙈`)
})

app.use('/*',(req,res)=>{
    res.status(404).send(`🙈🙉🙊🐵 ${req.method}: the ${req.baseUrl} was not found 🐵🙊🙉🙈`)
})
module.exports = { app }
