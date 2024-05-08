const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schemaUsuario = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    books_sold: [{ type: mongoose.Schema.Types.ObjectId, ref: "Libro" }],
    books_purchased: [{ type: mongoose.Schema.Types.ObjectId, ref: "Libro" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schemaUsuario.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

schemaUsuario.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

const User = mongoose.model("User", schemaUsuario);

module.exports = User;
