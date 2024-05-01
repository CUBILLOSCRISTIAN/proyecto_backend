const mongoose = require("mongoose");

const schemaUsuario = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    contraseña: { type: String, required: true },
    libros_vendidos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Libro" }],
    libros_comprados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Libro" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const Usuario = mongoose.model("Usuario", schemaUsuario);

module.exports = {Usuario};
