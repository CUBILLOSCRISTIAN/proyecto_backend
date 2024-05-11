const express = require("express");
const router = express.Router();
const { respondWithError } = require("../../utils/functions");
const { GetUserById } = require("./user.controller");
const { verifyToken } = require("../auth/auth.actions");

async function GetUser(req, res) {
  try {
    if (req.userId != req.params.id) {
      return respondWithError(res, {
        status: 403,
        message: "No tienes permisos para realizar esta acción.",
      });
    }

    const user = await GetUserById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    respondWithError(res, e);
  }
}

router.get("/:id", verifyToken, GetUser); //Obtener un usuario

module.exports = router;
