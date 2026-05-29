const express = require("express");
const TodoModel = require("../models/todo.models");

const TodoRouter = express.Router();

TodoRouter.post("/add-todo", async (req, res) => {
  //   await TodoModel.create(req.body); //This line and next 2 line of code is work same but the 2 line is better instead of these line.
  try {
    let todo = new TodoModel(req.body);
    await todo.save();
    res.status(201).json({ message: "Todo Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went Wrong" });
  }
});

TodoRouter.get("/allTodos", async (req, res) => {
  const{page,limit}=req.query;
  let skippingItem=(page-1)*limit;
  let todos = await TodoModel.find().skip(skippingItem).limit(limit)
  res.status(200).json({ message: "Todos List", todos });
});

TodoRouter.patch("/update-todo/:todoId", async (req, res) => {
  const { todoId } = req.params;
  let todo = await TodoModel.findByIdAndUpdate(todoId, req.body, {
    returnDocument: "after",
  });
  res.status(200).json({
    message: "Todo updated",
    updatedTodo: todo,
  });
});
module.exports = TodoRouter;
