const User = require("./user.model");

async function GetUserById(id) {
  const user = await User.findById(id);
  return user;
}

module.exports = { GetUserById };
