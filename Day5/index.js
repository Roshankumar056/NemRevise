const express = require("express");
const app = express();
const TodoRouter = require("./routes/todo.route");
const connectToDB = require("./configs/mongoDB.config");
const UserRouter = require("./routes/user.route");

app.use(express.json());




app.use("/todos",TodoRouter)
app.use("/users",UserRouter)

app.listen(8080, () => {
  connectToDB()
  console.log("Server Started");
});
