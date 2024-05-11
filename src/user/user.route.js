const express = require("express");
const router = express.Router();
const { respondWithError } = require("../../utils/functions");
const { GetUserById, updateUser } = require("./user.controller");
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

async function UpdateUser(req, res) {
  try {
    if (req.userId != req.params.id) {
      return respondWithError(res, {
        status: 403,
        message: "No tienes permisos para realizar esta acción.",
      });
    }

    const user = await updateUser(req.params.id, req.body);

    res
      .status(200)
      .json({ message: "Usuario actualizado correctamente.", user: user });
  } catch (e) {
    respondWithError(res, e);
  }
}

router.get("/:id", verifyToken, GetUser); //Obtener un usuario
router.patch("/:id", verifyToken, UpdateUser); //Actualizar un usuario

module.exports = router;
