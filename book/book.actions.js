const Book = require("./book.model");

async function createBookMongo(data) {
  const newBook = await Book.create(data);
  return newBook;
}

async function getBooksMongo(filters) {
  const numberOfBooks = await Book.countDocuments(filters);
  const books = await Book.find(filters);
  return { numberOfBooks, books };
}

module.exports = { createBookMongo, getBooksMongo };
