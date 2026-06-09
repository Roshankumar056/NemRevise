const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.models");
const saltRounds = 10;
var jwt = require('jsonwebtoken');
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const UserRouter = express.Router();

UserRouter.post("/signup", (req, res) => {
     console.log(req.body);
  try {
    // const { email, password } = req.body;
    const myPlaintextPassword=req.body.password;
    bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if(err){
        res.status(500).json({ message: "Error In Signup..." });
      }else{
        console.log(myPlaintextPassword, "----->" ,hash);
        await userModel.create({...req.body,password:hash})
        res.json({message:"signup sucess"})
        
      }
    });
  } catch (err) {
     res.status(500).json({ message: "Error In Signup..." });
  }
});


UserRouter.post("/login",async(req,res)=>{
    try{
    const myPlaintextPassword=req.body.password;
    let user =await userModel.findOne({email:req.body.email})
    if(!user){
        res.status(404).json({message:"User Not Found,  Please Signup"})
    }else{
        const hash=user.password
          bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
        // result == true
        if(err){
            res.status(500).json({ message: "Error In Login..." });
        }else{
            if(result){
                var token = jwt.sign({ userId:user._id,role:user.role }, 'shhhhh',{ expiresIn: 20});
                    res.status(200).json({message:"Login Sucess",token:token})
            }else{
                res.status(401).json({message:"Wrong Password"})
            } 
        }
      });
    }
    }catch(err){
        res.status(500).json({ message: "Error In Login..." });
    }
})


module.exports = UserRouter;
