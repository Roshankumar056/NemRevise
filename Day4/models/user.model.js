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
    addresses:[addressSchema],
    orders:[
        {
            productName:String,
            amount:String,
            delivery_Status:Boolean,
            mode_of_payment:String,
            delivery_address:addressSchema
        }
    ]
})

const userModel=mongoose.model("user",userSchema)

module.exports=userModel;


