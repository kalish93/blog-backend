
const express = require('express')
const router = express.Router()
const {verifyToken,verifyTokenAndAuthorization} = require('./verifyToken')
const CryptoJS = require('crypto-js')
const User = require('../models/User')


//update
router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    if(req.body.password){
        req.body.password =  CryptoJS.AES.encrypt(
            user.password, process.env.PASS_SEC
            ).toString()
    }
    try{

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted")
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


// get a user
router.get("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const user =await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//get all users

router.get("/",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


module.exports = router