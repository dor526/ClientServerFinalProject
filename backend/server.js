const express =require('express')
require('dotenv').config()
//express application
const app =express()
const mongoose = require('mongoose')
const stocksRoutes =require('./routes/stockes')
const userRoutes = require('./routes/user')

app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/dashboard', stocksRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log('connected to db and listen on port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
// app.listen(process.env.PORT,()=>{
//     console.log('connected to db and listen on port ', process.env.PORT)
// })



