const bookActions = require("./book.actions");
const { respondWithError } = require("../../utils/functions");

async function createBook(data) {
  const CreatedBook = await bookActions.createBookMongo(data);
  return CreatedBook;
}

async function readBookWithFilters(filters) {
  const resultadosBusqueda = await bookActions.getBooksMongo(filters);
  return resultadosBusqueda;
}

async function readBookById(id) {
  const book = await bookActions.getBookByIdMongo(id);
  return book;
}

async function updateBook(id, userId, data) {
  const book = await bookActions.getBookByIdMongo(id);
  if (!book) {
    respondWithError(404, "Libro no encontrado");
  }
  if (!book.dueño.equals(userId)) {
    respondWithError(403, "No eres el dueño de este libro");
  }
  const updatedBook = await bookActions.updateBookMongo(book._id, data);
  return updatedBook;
}

module.exports = { createBook, readBookWithFilters, readBookById, updateBook };
