const rateLimit=require("express-rate-limit")
module.exports=rateLimit({
    window:15*60*1000,
    max:100,
    message:{
        success:false,
        message:"Too many request"
    }
})