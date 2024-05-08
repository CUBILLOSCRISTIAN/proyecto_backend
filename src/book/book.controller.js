const { createBookMongo, getBooksMongo } = require("./book.actions");

async function createBook(data) {
  const CreatedBook = await createBookMongo(data);
  return CreatedBook;
}

async function readBookWithFilters(filters) {
  const resultadosBusqueda = await getBooksMongo(filters);
  return resultadosBusqueda;
}

module.exports = { createBook, readBookWithFilters };
