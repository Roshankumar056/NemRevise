const express = require("express");

const app = express();

app.use(express.json());

let products = [
  { id: 1, name: "Laptop", price: 50000 },

  { id: 2, name: "Mouse", price: 800 },
];

app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/products/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const product = products.find((p) => p.id === id);

    if (!product) {
      const err = new Error("Product not found");

      err.statusCode = 404;

      return next(err);
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

app.post("/products", (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name) {
      const err = new Error("Name is required");

      err.statusCode = 400;

      return next(err);
    }

    if (price === undefined) {
      const err = new Error("Price is required");

      err.statusCode = 400;

      return next(err);
    }

    if (typeof price !== "number") {
      const err = new Error("Price must be a number");

      err.statusCode = 400;

      return next(err);
    }

    const newProduct = {
      id: products.length + 1,

      name,

      price,
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: err.message || "Something went wrong",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
