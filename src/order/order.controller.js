const { verify } = require("jsonwebtoken");
const {
  createOrderMongo,
  getOrdersMongo,
  getOrderMongoById,
  updateOrderMongo,
  verifyOnlySalesman,
  getBooksTotalPrice,
} = require("./order.actions");

async function createOrder(data) {
  const { libros_ids } = data;

  if (!verifyOnlySalesman(libros_ids))
    return { error: "Todos los libros deben ser del mismo vendedor." };

  data.total = await getBooksTotalPrice(libros_ids);

  const createdOrder = await createOrderMongo(data);
  return createdOrder;
}

async function readOrdersWithFilters(filters) {
  const orders = await getOrdersMongo(filters);
  return orders;
}

async function readOrderById(id) {
  const order = await getOrderMongoById(id);
  return order;
}

async function updateOrder(id, data) {
  const updatedOrder = await updateOrderMongo(id, data);
  return updatedOrder;
}

module.exports = {
  createOrder,
  readOrdersWithFilters,
  readOrderById,
  updateOrder,
};
