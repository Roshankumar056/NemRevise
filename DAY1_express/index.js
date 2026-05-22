const express=require("express")
const fs=require("fs")
const app=express();


///first request response cycle

app.get("/home",(req,res)=>{
    res.send("Hello World")
    
})

app.get("/aboutus",(req,res)=>{
    res.send("This is about us")
    
})
app.get("/read",(req,res)=>{
    let data=fs.readFileSync("./index.js","utf-8")
    res.send(data)
    
})

app.get("/random",(req,res)=>{
    let num=Math.random()
    res.send(`The Random Number is ${num}`)
    
})
//start a server with an particular port/window that is 8080
app.listen(8080,()=>{
    console.log("Server Started");
    
})