const mongoose = require("mongoose");

const perguntaSchema = new mongoose.Schema({
    pergunta: {
      type: String,
      required: true,
    },
    nome: {
        type: String
    },
    dataCriacao: {
      type: Date,
      default: Date.now()
    }
});

const Pergunta = mongoose.model("perguntas", perguntaSchema);

module.exports = Pergunta