const { respondWithError, throwCustomError } = require("../../utils/functions");

const {
  createOrderMongo,
  verifyOnlySalesman,
  getBooksTotalPrice,
  getSalesman,
  getOrderMongo,
  getOrdersMongo,
  putOrderInUser,
  verifyUser,
  updateOrderVendedorMongo,
  updateOrderCompradorMongo,
} = require("./order.actions");

async function createOrder(data) {
  const { libros_ids } = data;

  const verifySalesman = await verifyOnlySalesman(libros_ids);

  if (!verifySalesman)
    return throwCustomError(
      400,
      "Solo puedes comprar libros de un mismo vendedor."
    );

  data.vendedor = await getSalesman(libros_ids);

  if (data.vendedor == data.comprador)
    return throwCustomError(400, "No puedes comprarte a ti mismo.");

  data.total = await getBooksTotalPrice(libros_ids);

  const createdOrder = await createOrderMongo(data);
  await putOrderInUser(data.comprador, createdOrder._id, 0); // 0 para comprador
  await putOrderInUser(data.vendedor, createdOrder._id, 1); // 1 para vendedor
  return createdOrder;
}

async function getOrder(idOrder, userId) {
  const order = await getOrderMongo(idOrder);

  if (!order) {
    return throwCustomError(404, "El pedido no existe. jeje");
  }

  const verify = await verifyUser(order, userId);
  if (!verify) {
    return throwCustomError(
      403,
      "No tienes permisos para realizar esta acción, solo el comprador o vendedor pueden ver el pedido"
    );
  }
  return order;
}

async function getOrders(userId, filters) {
  const orders = await getOrdersMongo(userId, filters);
  return orders;
}

async function updateOrder(idOrder, userId, data) {
  const { estado } = data;
  const order = await getOrderMongo(idOrder);

  if (!order) {
    return throwCustomError(404, "El pedido no existe.");
  }

  const verify = await verifyUser(order, userId);

  if (!verify) {
    return throwCustomError(
      403,
      "No tienes permisos para realizar esta acción, solo el comprador o vendedor pueden ver el pedido"
    );
  }

  if (estado) {
    if (estado === "cancelar" && order.estado !== "en progreso") {
      return throwCustomError(
        400,
        "No puedes cancelar un pedido que no está en progreso."
      );
    }

    return order.comprador === userId
      ? await updateOrderCompradorMongo(order, estado)
      : await updateOrderVendedorMongo(order, estado);
  }
}
module.exports = {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
};
