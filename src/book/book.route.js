const express = require("express");
const router = express.Router();
const {
  createBook,
  readBookWithFilters,
  readBookById,
} = require("./book.controller");

const { respondWithError } = require("../../utils/functions");

const { verifyToken } = require("../auth/auth.actions");

async function GetBooks(req, res) {
  try {
    const resultadosBusqueda = await readBookWithFilters(req.query);
    res.status(200).json({ ...resultadosBusqueda });
  } catch (e) {
    respondWithError(res, e);
  }
}

async function PostBook(req, res) {
  try {
    req.body.dueño = req.userId;
    const createdBook = await createBook(req.body);

    res.status(201).json(
      createdBook // Devuelve el libro creado,
    );
  } catch (e) {
    respondWithError(res, e);
  }
}

async function GetBook(req, res) {
  try {
    const book = await readBookById(req.params.id);
    res.status(200).json(book);
  } catch (e) {
    respondWithError(res, e);
  }
}

router.get("/", GetBooks); //Obtener todos los libros
router.get("/:id", GetBook); //Obtener un libro
router.post("/", verifyToken, PostBook); //Crear un libro

module.exports = router;
