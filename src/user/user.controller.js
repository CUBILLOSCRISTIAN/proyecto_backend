const { GetUserByIdMongo} = require("./user.actions");

async function GetUserById(id) {
  const user = await GetUserByIdMongo(id);
  return user;
}

module.exports = { GetUserById };
