const express = require('express')//פונקציות בשביל שהשרת יעבוד

const app = express()//בנית אובייקט מהטיפוס
app.get('/', (req, res) => {
    res.status(200).send('❤️❤️❤️❤️❤️❤️❤️❤️gili\'s serveris the nicest❤️❤️❤️❤️❤️❤️❤️❤️')
})


app.use('/*',(req,res)=>{
    res.status(404).send(`${req.method}: the ${req.baseUrl} was not found 🐵🙊🙉🙈`)
})
module.exports = { app }
