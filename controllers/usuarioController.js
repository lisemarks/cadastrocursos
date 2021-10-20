var repository = require('../database/database')()
const usuarioModel = require("../models/usuario");

module.exports = () => {

    const controller = {}

    controller.listar = async (req, res) => {
        try {
            const result = await usuarioModel.find({})
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ code: 'ERROR_0007', message: err.message });
        }
    }

    controller.salvar = async (req, res, callback) => {

        var client = await repository.conectar();
        const usuario = new usuarioModel(req.body);
        try {
            const result = await usuario.save();
            return res.status(200).json({ code: 'SUCESS_0003', message: 'Usuário cadastrado com sucesso' });
        } catch (err) {
            return res.status(500).json({ code: 'ERROR_0006', message: err.message });
        }
    }

    controller.alterar = async (req, res) => {

        try {
            var client = await repository.conectar();
            await usuarioModel.updateOne({_id:req.body._id}, req.body)
            return res.status(200).json(req.body);
        } catch (err) {
            return res.status(500).json({ code: 'ERROR_0006', message: err.message });
        }

    }

    controller.excluir = async (req, res) => {

        try{
            const id = req.params.id
            var client = await repository.conectar();
            await usuarioModel.deleteOne({ _id: id });
            return res.status(200).json({ code: 'SUCESS_0003', message: 'Registro excluído com sucesso' });
        }
        catch(err)
        {
            return res.status(500).json({ code: 'ERROR_0005', message: err.message });
        }

    }

    return controller
}