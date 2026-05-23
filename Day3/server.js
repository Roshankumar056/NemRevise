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
