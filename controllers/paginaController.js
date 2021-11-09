const paginaModel = require("../models/pagina");
var repository = require('../database/database')()

module.exports = () => {

    const paginaController = {}

    paginaController.listar = async (req, res) => {
        try {
            const result = await paginaModel.find({})
            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ code: 'ERROR_0011', message: err.message });
        }
    }

    paginaController.salvar = async (req, res) => {
        var client = await repository.conectar();
        const pagina = new paginaModel(req.body);
        try {
            const result = await pagina.save();
            return res.status(200).json({ code: 'SUCESS_0004', message: 'Página cadastrada com sucesso' });
        } catch (err) {
            return res.status(400).json({ code: 'ERROR_0012', message: err.message });
        }
    }

    paginaController.alterar = async (req, res) => {
        try {
            var client = await repository.conectar();
            await paginaModel.updateOne({_id:req.body._id}, req.body)
            return res.status(200).json(req.body);
        } catch (err) {
            return res.status(400).json({ code: 'ERROR_0013', message: err.message });
        }
    }

    paginaController.excluir = async (req, res) => {
        try{
            const id = req.params.id
            var client = await repository.conectar();
            await paginaModel.deleteOne({ _id: id });
            return res.status(200).json({ code: 'SUCESS_0005', message: 'Página excluída com sucesso' });
        }
        catch(err)
        {
            return res.status(400).json({ code: 'ERROR_0014', message: err.message });
        }
    }

    return paginaController;
}