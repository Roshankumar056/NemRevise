const express=require("express")
const { getData } = require("../models/todo.model");
const BlogRouter=express.Router()

BlogRouter.get("/allblog",(req,res)=>{
    let data=getData().data;
    let blog=data.blog;
    res.json({message:"blog List",blog})
})
module.exports=BlogRouter;