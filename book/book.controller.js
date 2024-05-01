const { throwCustomError } = require("../utils/functions");
const { createBookMongo } = require("./book.actions");

async function createBook(data) {
  //Si necesitamos hacer validaciones, las hacemos aquí, destructurando el objeto data
  const CreatedBook = await createBookMongo(data);
  return CreatedBook;
}

module.exports = { createBook };