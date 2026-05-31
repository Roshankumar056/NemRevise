const  mongoose  = require("mongoose");

const connectToDB=()=>{
    mongoose
  .connect("mongodb://127.0.0.1:27017/nemRevise")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Failed to connect");
  });

}

module.exports=connectToDB