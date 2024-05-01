const mongoose = require("mongoose");

const schemaPedido = new mongoose.Schema(
  {
    usuario_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    libros_ids: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Libro", required: true },
    ],
    estado: { type: String, required: true },
    fecha_creacion: { type: Date, default: Date.now },
    fecha_modificacion: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Pedido = mongoose.model("Pedido", schemaPedido);

module.exports = { Pedido };
