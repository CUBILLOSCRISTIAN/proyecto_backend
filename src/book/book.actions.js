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

async function changeStatusBookMongo(book) {
  book.disponible = false;
  await book.save();
  return book;
}

async function returnStatusBooksMongo(libros_ids) {
  const books = await Book.find({ _id: { $in: libros_ids } });
  books.every((book) => {
    book.disponible = true;
    book.save();
  });
}

async function changeStatusBooksMongo(libros_ids) {
  const books = await Book.find({ _id: { $in: libros_ids } });
  books.every((book) => bookActions.changeStatusBookMongo(book));
}

async function verifyOnlySalesman(books_ids) {
  const books = await Book.find({ _id: { $in: books_ids } });
  const firstSalesman = books[0].dueño;
  return books.every((book) => book.dueño.equals(firstSalesman));
}

async function getBooksTotalPrice(books_ids) {
  const books = await Book.find({ _id: { $in: books_ids } });
  return books.reduce((acc, book) => acc + book.precio, 0);

  async function getSalesman(books_ids) {
    const books = await Book.find({ _id: { $in: books_ids } });
    return books[0].dueño;
  }
}

module.exports = {
  createBookMongo,
  getBooksMongo,
  getBookByIdMongo,
  changeStatusBookMongo,
  returnStatusBooksMongo,
  changeStatusBooksMongo,
  verifyOnlySalesman,
  getBooksTotalPrice,
  getSalesman,
};
