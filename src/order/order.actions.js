const Order = require("./order.model");
const Book = require("../book/book.model");

async function createOrderMongo(data) {
  const newOrder = await Order.create(data);
  return newOrder;
}

async function verifyOnlySalesman(books_ids) {
  const books = await Book.find({ _id: { $in: books_ids } });
  const firstSalesman = books[0].dueño;
  return books.every((book) => book.dueño.equals(firstSalesman));
}

async function getBooksTotalPrice(books_ids) {
  const books = await Book.find({ _id: { $in: books_ids } });
  return books.reduce((acc, book) => acc + book.precio, 0);
}

async function getSalesman(books_ids) {
  const books = await Book.find({ _id: { $in: books_ids } });
  return books[0].dueño;
}

async function getOrderMongo(idOrder) {
  const order = await Order.findById(idOrder);
  return order;
}

module.exports = {
  createOrderMongo,
  verifyOnlySalesman,
  getBooksTotalPrice,
  getSalesman,
  getOrderMongo,
};
