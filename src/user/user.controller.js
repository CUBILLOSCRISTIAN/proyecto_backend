const { GetUserById} = require("./user.actions");

async function GetUser(id) {
  const user = await GetUserById(id);
  return user;
}

module.exports = { GetUser };
