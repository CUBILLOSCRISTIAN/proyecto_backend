const Order = require("./order.model");
const bookActions = require("../book/book.actions");
const userActions = require("../user/user.actions");

async function createOrderMongo(data) {
  const newOrder = await Order.create(data);
  return newOrder;
}

async function getOrderMongo(idOrder) {
  const order = await Order.findById(idOrder);
  return order;
}

async function getOrdersMongo(userId, filtros) {
  const user = await userActions.GetUserByIdMongo(userId);
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
  return order.comprador.equals(userId) || order.vendedor.equals(userId);
}

async function updateOrderCompradorMongo(order, estado) {
  if (estado !== "cancelar") {
    return throwCustomError(400, "El estado proporcionado no es válido.");
  }
  await bookActions.returnStatusBooksMongo(order.libros_ids);
  order.estado = estado;
  await order.save();
  return order;
}

async function updateOrderVendedorMongo(order, estado) {
  if (estado !== "cancelar" && estado !== "completar") {
    return throwCustomError(400, "El estado proporcionado no es válido.");
  }
  if (estado === "cancelar") {
    // Cambiar el estado de los libros si se cancela la orden
    await bookActions.returnStatusBooksMongo(order.libros_ids);
  }
  order.estado = estado;
  await order.save();
  return order;
}

module.exports = {
  createOrderMongo,
  getOrderMongo,
  getOrdersMongo,
  verifyUser,
  updateOrderCompradorMongo,
  updateOrderVendedorMongo,
};
