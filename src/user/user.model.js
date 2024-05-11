const mongoose = require("mongoose");

const schemaUsuario = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    books_sold: [{ type: mongoose.Schema.Types.ObjectId, ref: "Libro" }],
    books_purchased: [{ type: mongoose.Schema.Types.ObjectId, ref: "Libro" }],
    deleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("User", schemaUsuario);

module.exports = User;
