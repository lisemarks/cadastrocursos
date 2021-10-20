const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const UsuarioSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  nome: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
  dataCriacao: {
    type: Date,
    default: Date.now()
  }
});

UsuarioSchema.pre('save', async function(next) {
  const hash = await bcryptjs.hash(this.senha, 10);
  this.senha = hash;
  next();
})

const Usuario = mongoose.model("usuarios", UsuarioSchema);

module.exports = Usuario;