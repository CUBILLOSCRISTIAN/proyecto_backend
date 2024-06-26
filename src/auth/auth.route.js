const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

const { respondWithError } = require("../../utils/functions");

async function registerUser(req, res) {
  try {
    const newUser = await authController.register(req.body);
    res.status(201).json({ ...newUser });
  } catch (e) {
    respondWithError(res, e);
  }
}

async function loginUser(req, res) {
  try {
    const user = await authController.login(req.body);
    res.status(200).json({ ...user });
  } catch (e) {
    respondWithError(res, e);
  }
}

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
