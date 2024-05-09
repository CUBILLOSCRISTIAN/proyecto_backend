const express = require("express");
const router = express.Router();
const { respondWithError } = require("../../utils/functions");

async function GetUser(req, res) {
  try {
    const user = await readUserById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    respondWithError(res, e);
  }
}

router.get("/:id", GetUser); //Obtener un usuario

module.exports = router;
