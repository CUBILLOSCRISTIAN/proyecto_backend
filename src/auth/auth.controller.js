const authActions = require("./auth.actions");

async function register(data) {
  const { name, email, password } = data;
  if (!name || !email || !password) {
    throw { status: 400, message: "Missing data" };
  }
  data.password = await authActions.encryptPassword(password);
  const registeredUser = await authActions.registerUser(data);
  return registeredUser;
}

async function login(data) {
  const loggedUser = await authActions.loginUser(data);
  return loggedUser;
}

module.exports = { register, login };
