const Book = require("./book.model");

async function createBookMongo(data) {
  const newBook = await Book.create(data);
  return newBook;
}

async function getBooksMongo(filters) {
  filters = { ...filters, disponible: true };
  const numberOfBooks = await Book.countDocuments(filters);
  const books = await Book.find(filters);
  return { numberOfBooks, books };
}

async function getBookByIdMongo(id) {
  const book = await Book.findById(id);
  return book;
}

module.exports = { createBookMongo, getBooksMongo, getBookByIdMongo };
