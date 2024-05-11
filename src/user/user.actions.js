const { use } = require("../order/order.route");
const User = require("./user.model");

async function GetUserByIdMongo(id) {
  const user = await User.findById(id);
  return user;
}

async function userUpdateMongo(id, data) {
  const userUpdated = await User.findByIdAndUpdate(id, data);
  return userUpdated;
}

async function deleteUserMongo(id) {
  const filter = { deleted: true };
  await userUpdateMongo(id, filter);
}

async function putOrderInUser(userId, orderId, type) {
  const user = await GetUserByIdMongo(userId);
  type === 0
    ? user.books_purchased.push(orderId)
    : user.books_sold.push(orderId);
  await user.save();
}

module.exports = {
  GetUserByIdMongo,
  userUpdateMongo,
  deleteUserMongo,
  putOrderInUser,
};
