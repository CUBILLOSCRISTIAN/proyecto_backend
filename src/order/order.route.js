const express = require("express");
const router = express.Router();

const {
  createOrder,
  readOrdersWithFilters,
  readOrderById,
  updateOrder,
  deleteOrder,
} = require("./order.controller");

const { respondWithError, throwCustomError } = require("../../utils/functions");

const { verifyToken } = require("../auth/auth.actions");

async function PostOrder(req, res) {
  try {
    req.body.comprador = req.userId;
    const createdOrder = await createOrder(req.body);
    res.status(201).json(createdOrder);
  } catch (e) {
    throwCustomError(e);
  }
}

//Obtener una orden
router.post("/", verifyToken, PostOrder); //Crear una orden
module.exports = router;
