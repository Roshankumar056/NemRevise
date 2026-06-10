const mongoose=require("mongoose")
const blackListTokenSchema=new mongoose.Schema({
    token:String    
})

const blackListTokenModel=mongoose.model("BlacklistedToken",blackListTokenSchema)
module.exports=blackListTokenModel;