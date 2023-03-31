require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const BlogsRouter = require('./routes/blogs')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/Users')

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true}, mongoose.set('strictQuery',true))
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('database connected'))

app.use(express.json())
app.use('/blogs', BlogsRouter)
app.use('/auth',authRoute)
app.use('./users',userRoute)

app.listen(4000, ()=>{
    console.log('server started')
})