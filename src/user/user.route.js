const express = require("express");
const router = express.Router();
const { respondWithError, throwCustomError } = require("../../utils/functions");
const userController = require("./user.controller");
const { verifyToken } = require("../auth/auth.actions");

async function GetUser(req, res) {
  try {
    if (req.userId != req.params.id) {
      return throwCustomError(
        403,
        "No tienes permisos para realizar esta acción."
      );
    }

    const user = await userController.GetUserById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    respondWithError(res, e);
  }
}

async function UpdateUser(req, res) {
  try {
    if (req.userId != req.params.id) {
      return throwCustomError(
        403,
        "No tienes permisos para realizar esta acción."
      );
    }

    const user = await userController.updateUser(req.params.id, req.body);

    res
      .status(200)
      .json({ msg: "Usuario actualizado correctamente.", user: user });
  } catch (e) {
    respondWithError(res, e);
  }
}

async function DeleteUser(req, res) {
  try {
    if (req.userId != req.params.id) {
      return throwCustomError(
        403,
        "No tienes permisos para realizar esta acción."
      );
    }

    userController.deleteUser(req.params.id);

    res.status(200).json({ message: "Usuario eliminado correctamente." });
  } catch (e) {
    respondWithError(res, e);
  }
}

router.get("/:id", verifyToken, GetUser); //Obtener un usuario
router.patch("/update/:id", verifyToken, UpdateUser); //Actualizar un usuario
router.patch("/delete/:id", verifyToken, DeleteUser); //Actualizar un usuario

module.exports = router;
