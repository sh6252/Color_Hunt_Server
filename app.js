const express = require('express')//פונקציות בשביל שהשרת יעבוד

const app = express()//בנית אובייקט מהטיפוס
app.get('/', (req, res) => {
    res.status(200).send('❤️❤️❤️❤️❤️❤️❤️❤️my server❤️❤️❤️❤️❤️❤️❤️❤️')
})
app.get('/colors/:color',(req,res)=>{
    res.status(200).send(`🙈🙉🙊🐵 you selected ${req.params.color} 🐵🙊🙉🙈`)
})

app.use('/*',(req,res)=>{
    res.status(404).send(`🙈🙉🙊🐵 ${req.method}: the ${req.baseUrl} was not found 🐵🙊🙉🙈`)
})
module.exports = { app }
