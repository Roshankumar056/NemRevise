const mongoose=require("mongoose")

const policySchema=new mongoose.Schema({
    startDate:String,
    endDate:String,
    modeOfPayment:String,
    policyHolderId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    planId:{type:mongoose.Schema.ObjectId,ref:"plan"}
})

const policyModel=mongoose.model("policy",policySchema)
module.exports=policyModel