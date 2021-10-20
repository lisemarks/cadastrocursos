const mongoose = require("mongoose");

const CursoSchema = new mongoose.Schema({
  valor: {
    type: Number,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  perguntas: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'perguntas'
  }]
});

const Curso = mongoose.model("cursos", CursoSchema);

module.exports = Curso;