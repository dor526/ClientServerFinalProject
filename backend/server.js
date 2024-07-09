const express =require('express')
require('dotenv').config()
//express application
const app =express()

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.get('/',(req,res)=>{
    res.json({msg:'het you'})
})

app.listen(process.env.PORT,()=>{
    console.log('listen on port ', process.env.PORT)
})