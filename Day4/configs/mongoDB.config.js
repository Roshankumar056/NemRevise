const  mongoose  = require("mongoose");

const connectToDB=()=>{
  console.log("VALUE",process.env.MONGO_URI);
  
    mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Failed to connect");
  });

}

module.exports=connectToDB