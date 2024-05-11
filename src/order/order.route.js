const express = require("express");
const router = express.Router();

const { createOrder, getOrder, getOrders } = require("./order.controller");

const { respondWithError, throwCustomError } = require("../../utils/functions");

const { verifyToken } = require("../auth/auth.actions");

async function PostOrder(req, res) {
  try {
    req.body.comprador = req.userId;
    const createdOrder = await createOrder(req.body);
    res.status(201).json(createdOrder);
  } catch (e) {
    respondWithError(res, e);
  }
}

async function GetOrder(req, res) {
  try {
    const order = await getOrder(req.params.id, req.userId);
    res.status(200).json(order);
  } catch (e) {
    respondWithError(res, e);
  }
}

async function GetOrders(req, res) {
  try {
    const orders = await getOrders(req.userId, req.query);
    res.status(200).json(orders);
  } catch (e) {
    respondWithError(res, e);
  }
}

//Obtener una orden
router.post("/", verifyToken, PostOrder); //Crear una orden
router.get("/:id", verifyToken, GetOrder); //Obtener una orden
router.get("/", verifyToken, GetOrders); //Obtener todas las ordenes

module.exports = router;
