const { registerUser, loginUser } = require("./auth.actions");

async function register(data) {
  const registeredUser = await registerUser(data);
  return registeredUser;
}

async function login(data) {
  const loggedUser = await loginUser(data);
  return loggedUser;
}

module.exports = { register, login };
