const express = require("express");
const app = express();
const TodoRouter = require("./routes/todo.route");
const connectToDB = require("./configs/mongoDB.config");
const UserRouter = require("./routes/user.route");
const PolicyRouter = require("./routes/policy.routes");
require("dotenv").config()
app.use(express.json());




app.use("/todos",TodoRouter)
app.use("/users",UserRouter)
app.use("/policy",PolicyRouter)
app.listen(8080, () => {
  connectToDB()
  console.log("Server Started");
});
