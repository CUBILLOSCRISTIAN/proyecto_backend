const { createBookMongo, getBooksMongo, getBookByIdMongo} = require("./book.actions");

async function createBook(data) {
  const CreatedBook = await createBookMongo(data);
  return CreatedBook;
}

async function readBookWithFilters(filters) {
  const resultadosBusqueda = await getBooksMongo(filters);
  return resultadosBusqueda;
}

async function readBookById(id) {
  const book = await getBookByIdMongo(id);
  return book;
}

module.exports = { createBook, readBookWithFilters, readBookById };
