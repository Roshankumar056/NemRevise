const express = require("express");
const app = express();
const TodoRouter = require("./routes/todo.route");
const connectToDB = require("./configs/mongoDB.config");

app.use(express.json());




app.use("/todos",TodoRouter)


app.listen(8080, () => {
  connectToDB()
  console.log("Server Started");
});
