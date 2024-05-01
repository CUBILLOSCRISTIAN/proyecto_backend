const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // Create an express app

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

app.get("/", (req, res) => {
  res.status(200).json({});
});

const routesBooks = require("./book/book.route");
app.use("/books", routesBooks);

//MORE ROOUTES

mongoose.connect(
  "mongodb+srv://cristiancubillos0654:QolYJR7ZvwcCLyL6@cluster0.m7ju5gz.mongodb.net/"
);

app.listen(8080);
