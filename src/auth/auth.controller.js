const User = require("../user/user.model");
const jwt = require("jsonwebtoken");
const config = require("../../config");

async function register(data) {
  const { name, email, password } = data;

  const newUser = new User({
    name,
    email,
    password: await User.encryptPassword(password),
  });

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400, //24 horas
  });

  return { token };
}

async function login(data) {
  const { name, email, password } = data;
}

module.exports = { register, login };
