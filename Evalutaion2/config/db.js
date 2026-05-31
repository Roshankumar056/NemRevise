const mongoose=require("mongoose")
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connected");    
    }catch (err){
        console.log("Connected Failed");
        console.log(err.message);
        process.exit(1)
    }
}

module.exports=connectDB;