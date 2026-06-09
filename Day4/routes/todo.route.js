const express = require("express");
const TodoModel = require("../models/todo.models");
const userModel = require("../models/user.model");

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
  const { title, status, page, limit, sort, order } = req.query;
  const queryObj = {};
  if (title) {
    queryObj.title = { $regex: title, $options: "i" };
  }
  if (status) {
    queryObj.status = status;
  }
  console.log(queryObj);
  let skippingItem = (page - 1) * limit;
  let todos = await TodoModel.find(queryObj)
    .skip(skippingItem)
    .limit(limit)
    .sort({ [sort]: order == "asc" ? 1 : -1 });
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

TodoRouter.get("/analytics", async (req, res) => {
  let ans = await TodoModel.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    message: "Analytics",
    data: ans,
  });
});

TodoRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  let user = await userModel.findById(userId, {
    __v: 0,
    _id: 0,
  });

  let todos = await TodoModel.find(
    { createdBy: userId },
    { createdBy: 0, __v: 0 },
  );

  res.status(200).json({
    message: "TodoList",
    details: { user, todos },
  });
});

module.exports = TodoRouter;
