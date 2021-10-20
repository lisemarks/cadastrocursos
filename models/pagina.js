const mongoose = require("mongoose");

const PaginaSchema = new mongoose.Schema({
  dataCadastro: {
      type: Date,
      default: Date.now()
  },
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  }
});



const Pagina = mongoose.model("paginas", PaginaSchema);

module.exports = Pagina;