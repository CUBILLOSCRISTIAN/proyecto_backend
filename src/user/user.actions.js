const User = require("./user.model");

async function getUserByIdMongo(id) {
  console.log(`id in la funcion${id}`);
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
  const user = await getUserByIdMongo(userId);
  type === 0
    ? user.books_purchased.push(orderId)
    : user.books_sold.push(orderId);
  await user.save();
}



async function writeHello() {
  console.log("Hello");
}

module.exports = {
  getUserByIdMongo,
  userUpdateMongo,
  deleteUserMongo,
  putOrderInUser,
  writeHello,
};
