const mongoose = require("mongoose");

const schemaLibro = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    genero: { type: String, required: true },
    fecha_publicacion: { type: Date, required: true },
    casa_editorial: { type: String, required: true },
    usuario_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    disponible: { type: Boolean, required: true },
    eliminado: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Libro = mongoose.model("Libro", schemaLibro);

module.exports = { Libro };
