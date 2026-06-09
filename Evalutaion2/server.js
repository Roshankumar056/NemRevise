const express=require("express");
const connectDB = require("./config/db");
const logger = require("./middleware/loggerMiddleware");
const rateLimit= require("./middleware/rateLimitter");
const errorHandler = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
require("dotenv").config()

const app=express()
connectDB()
app.use(express.json())
app.use(logger)
app.use("/api",rateLimit)
app.use("/api/auth",authRoutes)
app.use("/api/posts",postRoutes)
app.use(errorHandler)
const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    
    console.log(`Server running on Port ${PORT}`);
    
})
