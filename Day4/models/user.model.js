const mongoose=require("mongoose")

const addressSchema=new mongoose.Schema({
    receiverName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    area: { type: String, required: true },
    landMark: { type: String, required: true },
    pincode: { type: String, required: true }
  })

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
})

const userModel=mongoose.model("User",userSchema)

module.exports=userModel;


