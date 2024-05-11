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
  await User.findByIdAndUpdate(id, filter);
}

module.exports = { GetUserByIdMongo, userUpdateMongo, deleteUserMongo };
