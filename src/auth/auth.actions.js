const User = require("../user/user.model");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { respondWithError, throwCustomError } = require("../../utils/functions");
const bcrypt = require("bcryptjs");

async function registerUser(data) {
  const { name, email, password } = data;

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();

  return { message: "User created successfully" };
}

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function loginUser(data) {
  const { email, password } = data;

  const userFound = await User.findOne({ email: email });

  if (!userFound) {
    return throwCustomError(404, "User not found");
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

async function verifyToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = await jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });
    next();
  } catch (error) {
    respondWithError(res, error);
  }
}

module.exports = { registerUser, loginUser, verifyToken, encryptPassword };
