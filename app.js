const express = require('express')//פונקציות בשביל שהשרת יעבוד
const palleteRouter = require('./routers/pallete')
const { startLogger, endLogger } = require('./utils/middlewares/logger')

const app = express()//בנית אובייקט מהטיפוס

app.use(startLogger)

app.get('/', (req, res, next) => {
    res.locals.response = 200
    res.status(200).send('❤️❤️❤️❤️❤️❤️❤️❤️my server!❤️❤️❤️❤️❤️❤️❤️❤️')
    next()
})

app.use('/pallete', palleteRouter)



app.use('/*', (req, res,next) => {
    if (res.locals.response === undefined) {
        res.status(404).send(`🙈🙉🙊🐵 ${req.method}: the ${req.baseUrl} was not found 🐵🙊🙉🙈`)
        res.locals.response = 404
    }
    next()
})

app.use(endLogger)
module.exports = { app }
