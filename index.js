require(`dotenv`).config();

const express = require('express')

const Db = require('./DB/connection')
 
const router = require('./Routes/router')

const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

const PORT = 3000||process.env.PORT

app.listen(PORT,()=>{
    console.log("Running on PORT ",+PORT);
    
})
app.get('/',(req,res)=>{
    res.send('welcome to backend server')
})