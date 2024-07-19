const express = require('express')
const User = require('../models/userModel')

const router = express.Router()

router.post('/login',  async (req,res)=>{
    const {email, password} =req.body
    try{
        const user = await User.login(email, password)
        res.status(200).json({email})
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

router.post('/signup', async (req,res)=>{
    const {email, password} =req.body
    try{
        const user = await User.signup(email, password)
        res.status(200).json({email})
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

module.exports =router