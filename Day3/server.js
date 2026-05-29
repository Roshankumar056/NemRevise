const express = require("express");

const TodoRouter = require("./routes/todo.routes");
const BlogRouter = require("./routes/blogs.routes");
const { loggerMiddleWare } = require("./middlewares/logger.middleware");
const { rateLimit } = require("express-rate-limit");
const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit:5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
   // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

app.use(express.json());
app.use(limiter);
app.use(loggerMiddleWare);

app.get("/home", (req, res) => {
  res.json({ message: "This is home page" });
});
////TODO ROUTES

app.use("/todos", TodoRouter);

app.use("/blog", BlogRouter);

app.listen(8080, () => {
  console.log("server stared");
});

// const express = require("express");

// const app = express();

// app.use(express.json());

// let tasks = [
//   { id: 1, title: "Revise Node.js", completed: false },

//   { id: 2, title: "Practice Express routes", completed: true },
// ];

// app.get("/tasks", (req, res) => {
//   res.status(200).json(tasks);
// });

// app.get("/tasks/:id", (req, res) => {
//   const id = Number(req.params.id);

//   const task = tasks.find((t) => t.id === id);

//   if (!task) {
//     return res.status(404).json({
//       error: "Task not found",
//     });
//   }

//   res.status(200).json(task);
// });

// app.post("/tasks", (req, res) => {
//   const { title } = req.body;

//   if (!title) {
//     return res.status(400).json({
//       error: "Title is required",
//     });
//   }

//   const newTask = {
//     id: tasks.length + 1,

//     title,

//     completed: false,
//   };

//   tasks.push(newTask);

//   res.status(201).json(newTask);
// });

// app.delete("/tasks/:id", (req, res) => {
//   const id = Number(req.params.id);

//   const taskIndex = tasks.findIndex((t) => t.id === id);

//   if (taskIndex === -1) {
//     return res.status(404).json({
//       error: "Task not found",
//     });
//   }

//   const deletedTask = tasks.splice(taskIndex, 1);

//   res.status(200).json({
//     message: "Task deleted successfully",

//     deletedTask,
//   });
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
