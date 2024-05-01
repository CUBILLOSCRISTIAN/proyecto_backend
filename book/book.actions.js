const Book = require("./book.model");

async function createBookMongo(data) {
  const newBook = await Book.create(data);
  return newBook;
}

module.exports = { createBookMongo };
