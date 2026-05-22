const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

app.get("/home", (req, res) => {
  res.send("This is home page");
});

app.get("/aboutus", (req, res) => {
  res.json({ message: "This is aboutus page" });
});

app.post("/contactus", (req, res) => {
  res.json({ message: "This is contact us Page" });
});

app.patch("/patch", (req, res) => {
  res.json({ message: "This is patch request" });
});

app.delete("/delete", (req, res) => {
  res.json({ message: "This is delete request" });
});

app.get("/allTodos", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  res.json({ message: "Hy", todos });
});

app.get("/todos", (req, res) => {
    let title=req.query.title
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let filteredtodos = data.todos.filter((todo,id)=>todo.title.includes(title));
  res.json({ message: "Hy", todos:filteredtodos });
});

app.post("/add-todo", (req, res) => {
  console.log(req.body);
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  let id = todos[todos.length - 1].id + 1;
  let todoAdded = { ...req.body, id };
  todos.push(todoAdded);
  console.log(todos);
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.json({ message: "Todo added" });
});

app.patch("/update-todo/:todoId", (req, res) => {
  console.log(req.params);
  let { todoId } = req.params;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  let foundIndex = todos.findIndex((ele) => ele.id == todoId);
  console.log(foundIndex, todoId);
  if (foundIndex == -1) {
    res.json({ message: "Todo not found" });
  } else {
    let updatedTodos = todos.map((todo, id) => {
      if (todo.id == todoId) {
        return { ...todo, ...req.body };
      } else {
        return todo;
      }
    })
    console.log(updatedTodos);
    data.todos=updatedTodos
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.json({ message: "Todo updated" });
  }
});



app.delete("/delete-todo/:todoId", (req, res) => {
  console.log(req.params);
  let todoId = req.params.todoId
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  let foundIndex = todos.findIndex((ele) => ele.id == todoId);
  console.log(foundIndex, todoId);
  if (foundIndex == -1) {
    res.json({ message: "Todo not found" });
  } else {
    let filteredTodo = todos.filter((todo, id) => todo.id != todoId)
    data.todos=filteredTodo
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.json({ message: "Todo Deleted" });
  }
});
app.listen(8080, () => {
  console.log("server stared");
});
