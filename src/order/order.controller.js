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
} = require("./order.actions");

async function createOrder(data) {
  const { libros_ids } = data;

  if (!verifyOnlySalesman(libros_ids))
    return throwCustomError(
      400,
      "Solo puedes comprar libros de un mismo vendedor."
    );

  data.vendedor = await getSalesman(libros_ids);

  if (data.vendedor == data.comprador)
    return throwCustomError(400, "No puedes comprarte a ti mismo.");

  data.total = await getBooksTotalPrice(libros_ids);

  const createdOrder = await createOrderMongo(data);
  await putOrderInUser(data.comprador, createdOrder._id, 0);
  await putOrderInUser(data.vendedor, createdOrder._id, 1);
  return createdOrder;
}

async function getOrder(idOrder, userId) {
  try {
    const order = await getOrderMongo(idOrder);

    if (verifyUser(order, userId)) {
      return throwCustomError(
        403,
        "No tienes permisos para realizar esta acción, solo el comprador o vendedor pueden ver el pedido"
      );
    }
    return order;
  } catch (error) {
    throwCustomError(404, "El pedido no existe.");
  }
}

async function getOrders(userId, filters) {
  const orders = await getOrdersMongo(userId, filters);
  return orders;
}

module.exports = {
  createOrder,
  getOrder,
  getOrders,
};
