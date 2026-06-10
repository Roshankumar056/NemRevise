const express=require("express")
const TodoModel = require("../models/todo.model")
const authMiddleware = require("../middleware/auth.middleware")

const TodoRouter=express.Router()
// TodoRouter.use(authMiddleware)
TodoRouter.post("/add-todo", authMiddleware("user","admin"), async(req,res)=>{
    
    try{
        let todo=await TodoModel.create({...req.body,createdBy:req.user})
        res.status(200).json({message:"Todo Added"})
    }catch(err){
        res.status(500).json({message:"Error in adding Todo"})
    }
})


TodoRouter.get("/alltodos",authMiddleware("user","admin"),async(req,res)=>{
   
    
    try{
        let todos=[]
        if(req.userRole==="admin"){
            todos=await TodoModel.find()
        }else{
            todos=await TodoModel.find({createdBy:req.user})
        }
         
        res.status(200).json({message:"Todo List...",todos})
    }catch(err){
        res.status(500).json({message:"Error in getting Todo"})
    }
})

module.exports=TodoRouter