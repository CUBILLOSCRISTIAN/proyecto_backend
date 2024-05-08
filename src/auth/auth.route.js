const express = require("express");
const router = express.Router();
const { register, login } = require("./auth.controller");

async function registerUser(req, res) {
  try {
    const newUser = await register(req.body);
    res.status(201).json({ ...newUser });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function loginUser(req, res) {
  try {
    const user = await login(req.body);
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
}

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
