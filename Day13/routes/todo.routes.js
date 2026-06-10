const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middleware/auth.middleware");
const cron = require("node-cron");
const redis = require("../config/redis.config");

const TodoRouter = express.Router();
// TodoRouter.use(authMiddleware)
TodoRouter.post(
  "/add-todo",
  authMiddleware("user", "admin"),
  async (req, res) => {
    try {
      let todo = await TodoModel.create({ ...req.body, createdBy: req.user });
      res.status(200).json({ message: "Todo Added" });
    } catch (err) {
      res.status(500).json({ message: "Error in adding Todo" });
    }
  },
);

TodoRouter.get(
  "/alltodos",
  authMiddleware("user", "admin"),
  async (req, res) => {
    let todos;
    try {
       let cachedData= await redis.get(req.user)
       if(!cachedData){
         todos = await TodoModel.find({ createdBy: req.user });
        redis.set(req.user,JSON.stringify(todos),"EX",30)
         res.status(200).json({ message: "Todo List...DB", todos });
       }else{
        console.log(cachedData);
        todos=JSON.parse(cachedData)
         res.status(200).json({ message: "Todo List...REDIS", todos });
       }

      
     
    } catch (err) {
      res.status(500).json({ message: "Error in getting Todo" });
    }
  },
);

module.exports = TodoRouter;
