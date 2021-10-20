const perguntaModel = require("../models/pergunta");
var repository = require('../database/database')()

module.exports = () => {

    const perguntaController = {}

    perguntaController.salvar = async (req, res) => {
        
        var client = await repository.conectar();
        const pergunta = new perguntaModel(req.body);
        try {
            const result = await pergunta.save();
            return res.status(200).json({ code: 'SUCESS_0003', message: 'Pergunta cadastrada com sucesso' });
        } catch (err) {
            return res.status(500).json({ code: 'ERROR_0006', message: err.message });
        }
        
    }

    return perguntaController;
}