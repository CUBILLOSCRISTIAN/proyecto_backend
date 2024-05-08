const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // Create an express app

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

app.get("/", (req, res) => {
  res.status(200).json({});
});

const routesBooks = require("./src/book/book.route");
app.use("/books", routesBooks);

const routesAuth = require("./src/auth/auth.route");
app.use("/auth", routesAuth);

//MORE ROOUTES

mongoose.connect(
  "mongodb+srv://cristiancubillos0654:QolYJR7ZvwcCLyL6@cluster0.m7ju5gz.mongodb.net/"
);

app.listen(8080);
