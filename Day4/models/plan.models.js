const mongoose=require("mongoose")

const planSchema=new mongoose.Schema({
    name:String,
    investment:Number,
    returns:Number,
    duration:Number
})

const planModel=mongoose.model("plan",planSchema)
module.exports=planModel