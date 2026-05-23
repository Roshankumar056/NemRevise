const express = require("express");
// const { getData, addOrUpdateTodo } = require("../models/todo.model");
const {
  getAllTodos,
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");
const { getIncomingTodo, TodoRouterMiddleWare } = require("../middlewares/todo.middlewares");
const TodoRouter = express.Router();


TodoRouter.use(TodoRouterMiddleWare)

TodoRouter.get("/allTodos", getAllTodos);

TodoRouter.get("/todos", getTodos);


TodoRouter.post("/add-todo", getIncomingTodo, addTodo);

TodoRouter.patch("/update-todo/:todoId", updateTodo);

TodoRouter.delete("/delete-todo/:todoId", deleteTodo);

module.exports = TodoRouter;
