const express = require("express");
const router = express.Router();
const { createBook } = require("./book.controller");

const { respondWithError } = require("../utils/functions");

function GetBooks(req, res) {
  res.status(200).json({
    mensaje: "GET 📚",
  });
}

async function PostBook(req, res) {
  try {
    await createBook(req.body);

    res.status(200).json({
      mensaje: "Creado. 🎉",
    });
  } catch (e) {
    respondWithError(res, e);
  }
}

router.get("/", GetBooks);
router.post("/", PostBook);

module.exports = router;
