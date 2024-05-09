const { default: mongoose } = require("mongoose");
const Order = require("./order.model");

async function createOrderMongo(data) {
  const newOrder = await Order.create(data);
  return newOrder;
}

async function verifyOnlySalesman(books_ids) {
  const books = await Book.find({ _id: { $in: books_ids } });
  const firstSalesman = books[0].vendedor;
  return books.every((book) => book.vendedor === firstSalesman);
}

async function getBooksTotalPrice(books_ids) {
  const books = await Book.find({ _id: { $in: books_ids } });
  return books.reduce((acc, book) => acc + book.precio, 0);
}

module.exports = { createOrderMongo, verifyOnlySalesman, getBooksTotalPrice };
