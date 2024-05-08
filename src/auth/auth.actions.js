const User = require("../user/user.model");
const jwt = require("jsonwebtoken");
const config = require("../../config");

async function registerUser(data) {
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

async function loginUser(data) {
  const { email, password } = data;

  const userFound = await User.findOne({ email: email });

  if (!userFound) {
    throw new Error("User not found");
  }

  const matchPassword = await User.comparePassword(
    password,
    userFound.password
  );

  if (!matchPassword) return { message: "Invalid password" };

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400, //24 horas
  });
  return { token };
}

module.exports = { registerUser, loginUser };
