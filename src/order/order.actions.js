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

async function putOrderInUser(userId, orderId, type) {
  const user = await User.findById(userId);
  type === 0
    ? user.books_purchased.push(orderId)
    : user.books_sold.push(orderId);
  await user.save();
}

async function getOrdersMongo(userId, filtros) {
  const user = await User.findById(userId);
  const orders = await user.books_purchased.map((orderId) => {
    const order = awaitOrder.findById(orderId);
    // Verificar si la orden cumple con los filtros
    const cumpleFiltros = verificarFiltros(filtros || {}, order);
    return cumpleFiltros ? order : null;
  });
  return orders;
}

async function verificarFiltros(filtros, order) {
  const camposValidos = ["fecha_inicio", "fecha_fin", "estado"];

  // Verificar que los filtros solo contengan campos válidos
  const camposFiltros = Object.keys(filtros);

  const filtrosValidos = camposFiltros.every((filtro) =>
    camposValidos.includes(filtro)
  );

  const estadosValidos = ["en progreso", "completado", "cancelado"];

  // Verificar el estado de la orden si se proporciona el filtro de estado
  if (filtros.estado && !estadosValidos.includes(filtros.estado)) {
    throw new Error("El filtro de estado contiene un valor no válido");
  }

  if (!filtrosValidos) {
    throw new Error("Los filtros proporcionados contienen campos no válidos");
  }

  if (order.estado && order.estado !== filtros.estado) {
    return false; // No cumple con el filtro de estado
  }

  if (filtros.fecha_inicio && order.createdAt < filtros.fecha_inicio) {
    return false; // No cumple con el filtro de fecha_inicio
  }

  if (filtros.fecha_fin && order.createdAt > filtros.fecha_fin) {
    return false; // No cumple con el filtro de fecha_fin
  }

  return true;
}

async function verifyUser(order, userId) {
  return !order.comprador.equals(userId) && !order.vendedor.equals(userId);
}

module.exports = {
  createOrderMongo,
  verifyOnlySalesman,
  getBooksTotalPrice,
  getSalesman,
  getOrderMongo,
  putOrderInUser,
  getOrdersMongo,
  verifyUser,
};
