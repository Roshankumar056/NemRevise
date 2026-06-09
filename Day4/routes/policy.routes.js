const express=require("express");
const policyModel = require("../models/policy.model");
const planModel = require("../models/plan.models");


const PolicyRouter=express.Router();

PolicyRouter.post("/add-plan",async(req,res)=>{
    let plan=await planModel.create(req.body);
    res.status(201).json({message:"Plan Added",plan})
})

PolicyRouter.post("/buy-policy",async(req,res)=>{
    let policy=await policyModel.create(req.body);
    res.status(201).json({message:"Plan Aded",policy})
})

PolicyRouter.get("/policy-details/:policyId",async(req,res)=>{
    const {policyId}=req.params
    let policy=await policyModel.findById(policyId).populate("policyHolderId").populate("planId")
    res.status(201).json({message:"Policy Detail",policy})
})
module.exports=PolicyRouter