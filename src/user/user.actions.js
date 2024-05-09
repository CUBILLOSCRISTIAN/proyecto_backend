const User = require("./user.model");

async function GetUserByIdMongo(id) {
  const user = await User.findById(id);
  return user;
}

module.exports = { GetUserByIdMongo };
