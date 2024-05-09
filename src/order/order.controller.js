const { verify } = require("jsonwebtoken");
const {
  createOrderMongo,
  verifyOnlySalesman,
  getBooksTotalPrice,
  getSalesman,
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

module.exports = {
  createOrder,
};
