const express = require("express");
const connectDB = require("./config/mongodb.config");
const UserRouter = require("./routes/user.routes");
const TodoRouter = require("./routes/todo.routes");
const cron = require('node-cron');
const redis = require("./config/redis.config");


const app = express();
require("dotenv").config();
const PORT=process.env.PORT||5000
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "This is test Routes" });
});

app.use("/users",UserRouter)
app.use("/todos",TodoRouter)

// redis.set("mykey", "value");//this is for testing

app.listen(PORT, () => {
  console.log("Server Started");
});
