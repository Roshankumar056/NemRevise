const express = require("express");

const app = express();

app.use(express.json());

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Unauthorized access",
    });
  }

  const token = authHeader.split(" ")[1];

  if (token !== "secret123") {
    return res.status(401).json({
      error: "Unauthorized access",
    });
  }

  next();
};

app.get("/public", (req, res) => {
  res.json({
    message: "This is a public route",
  });
});

app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    name: "Student User",

    role: "Developer",
  });
});

app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to dashboard",

    data: ["HTML", "CSS", "JavaScript", "Node.js"],
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
