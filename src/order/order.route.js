const express = require("express");
const router = express.Router();

const {
  createOrder,
  readOrdersWithFilters,
  readOrderById,
  updateOrder,
  deleteOrder,
} = require("./order.controller");

const { respondWithError } = require("../../utils/functions");

const { verifyToken } = require("../auth/auth.actions");

//Funciones del controlador
async function GetOrders(req, res) {
  try {
    const orders = await readOrdersWithFilters(req.query);
    res.status(200).json({ orders });
  } catch (e) {
    respondWithError(res, e);
  }
}

async function GetOrder(req, res) {
  try {
    const order = await readOrderById(req.params.id);
    res.status(200).json(order);
  } catch (e) {
    respondWithError(res, e);
  }
}

async function PostOrder(req, res) {
  try {
    req.body.comprador = req.userId;
    const createdOrder = await createOrder(req.body);
    res.status(201).json(createdOrder);
  } catch (e) {
    respondWithError(res, e);
  }
}

async function PutOrder(req, res) {
  try {
    const updatedOrder = await updateOrder(req.params.id, req.body);
    res.status(200).json(updatedOrder);
  } catch (e) {
    respondWithError(res, e);
  }
}

router.get("/", verifyToken, GetOrders); //Obtener todas las ordenes
router.get("/:id", verifyToken, GetOrder); //Obtener una orden
router.post("/", verifyToken, PostOrder); //Crear una orden
router.put("/:id", verifyToken, PutOrder); //Actualizar una orden

module.exports = router;
