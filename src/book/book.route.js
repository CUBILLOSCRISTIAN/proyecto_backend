const express = require("express");
const router = express.Router();
const { createBook, readBookWithFilters } = require("./book.controller");

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
    await createBook(req.body);

    res.status(201).json(
      req.body // Devuelve el libro creado,
    );
  } catch (e) {
    respondWithError(res, e);
  }
}

router.get("/", GetBooks);
router.post("/", verifyToken, PostBook); //Crear un libro

module.exports = router;
