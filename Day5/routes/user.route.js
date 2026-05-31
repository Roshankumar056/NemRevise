const express=require("express");
const userModel = require("../models/user.model");

const UserRouter=express.Router()

UserRouter.post("/add-user",async(req,res)=>{
    try{
        let user=await userModel.create(req.body)
        res.status(201).json({message:"User Created",user})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"User Creation Failed"})
        
    }
})

UserRouter.patch("/add-address/:userId",async(req,res)=>{
    try{
        const {userId}=req.params
        let user=await userModel.findById(userId)
        if(!user){
            res.status(404).json({messgae:"User Not Found"})
        }else{
            user.addresses.push(req.body)
            await user.save()
            res.status(201).json({message:"Address Add"})
        }
    }catch(err){
        console.log(err);
        
    }
})

module.exports=UserRouter;