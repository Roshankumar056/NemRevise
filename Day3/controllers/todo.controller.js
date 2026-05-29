const { getData, addOrUpdateTodo } = require("../models/todo.model");

const getAllTodos = (req, res) => {
  let data = getData().data;
  let todos = data.todos;
  res.status(200).json({ message: "Hy", todos });
};

const getTodos = (req, res) => {
  let title = req.query.title;
  let data = getData().data;
  let filteredtodos = data.todos.filter((todo) => todo.title.includes(title));
  res.json({ message: "Hy", todos: filteredtodos });
};

const addTodo = (req, res) => {
  let data = getData().data;
  let todos = data.todos;
  let id = todos[todos.length - 1].id + 1;
  let todoAdded = { ...req.body, id };
  todos.push(todoAdded);
  addOrUpdateTodo(data);
  res.status(201).json({ message: "Todo added" });
};

const updateTodo = (req, res) => {
  let todoId = req.params.todoId;
  //let {todoId}=req.params
  let data = getData().data;
  let todos = data.todos;
  let foundIndex = todos.findIndex((ele) => ele.id == todoId);
  if (foundIndex == -1) {
    res.status(404).json({ message: "Todo not found" });
  } else {
    let updatedTodos = todos.map((todo, id) => {
      if (todo.id == todoId) {
        return { ...todo, ...req.body };
      } else {
        return todo;
      }
    });
    data.todos = updatedTodos;
    addOrUpdateTodo(data);
    res.json({ message: "Todo updated" });
  }
};

const deleteTodo = (req, res) => {
  let todoId = req.params.todoId;
  let data = getData().data;
  let todos = data.todos;
  let foundIndex = todos.findIndex((ele) => ele.id == todoId);
  if (foundIndex == -1) {
    res.json({ message: "Todo not found" });
  } else {
    let filteredTodo = todos.filter((todo, id) => todo.id != todoId);
    data.todos = filteredTodo;
    addOrUpdateTodo(data);
    res.json({ message: "Todo Deleted" });
  }
};

module.exports = { getAllTodos, getTodos, addTodo, updateTodo, deleteTodo };
