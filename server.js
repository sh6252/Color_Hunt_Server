const http=require('http')
const {app}=require('./app')
require('dotenv').config()

const {HOST="127.0.0.1",PORT=8080}=process.env


app.listen(PORT,HOST,()=>{
    console.log(`the server is running at http://${HOST}:${PORT} `);  
})

const server=http.createServer(app)