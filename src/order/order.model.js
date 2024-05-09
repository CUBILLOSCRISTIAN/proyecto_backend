const mongoose = require("mongoose");

const schemaPedido = new mongoose.Schema(
  {
    comprador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    libros_ids: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Libro", required: true },
    ],
    direccion_envio: { type: String, required: true },
    total: { type: Number, required: true },
    estado: { type: String, default: "en progreso" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Pedido = mongoose.model("Pedido", schemaPedido);

module.exports = { Pedido };
