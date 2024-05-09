const express = require("express");
const router = express.Router();
const { respondWithError } = require("../../utils/functions");
const { GetUserById } = require("./user.controller");

async function GetUser(req, res) {
  try {
    const user = await GetUserById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    respondWithError(res, e);
  }
}

router.get("/:id", GetUser); //Obtener un usuario

module.exports = router;
