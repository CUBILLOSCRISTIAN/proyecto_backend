const { respondWithError, throwCustomError } = require("../../utils/functions");

const {
  createOrderMongo,
  verifyOnlySalesman,
  getBooksTotalPrice,
  getSalesman,
  getOrderMongo,
} = require("./order.actions");

async function createOrder(data) {
  const { libros_ids } = data;

  if (!verifyOnlySalesman(libros_ids))
    return { error: "Todos los libros deben ser del mismo vendedor." };

  data.vendedor = await getSalesman(libros_ids);

  data.total = await getBooksTotalPrice(libros_ids);

  const createdOrder = await createOrderMongo(data);
  return createdOrder;
}

async function getOrder(idOrder, userId) {
  try {
    const order = await getOrderMongo(idOrder);

    if (order.comprador != userId && order.vendedor != userId) {
      return throwCustomError(
        403,
        "No tienes permisos para realizar esta acción."
      );
    }
    return order;
  } catch (error) {
    throwCustomError(404, "El pedido no existe.");
  }
}
module.exports = {
  createOrder,
  getOrder,
};
