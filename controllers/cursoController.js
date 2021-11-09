const cursoModel = require("../models/curso");
var repository = require('../database/database')()

module.exports = () => {

    const cursoController = {}

    cursoController.listar = async (req, res) => {
        try {
            const result = await cursoModel.find({})
            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ code: 'ERROR_0005', message: err.message });
        }
    }

    cursoController.listarcursos = async (req, res) => {
        try {
            const result = await cursoModel.find({}).populate("perguntas");
            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ code: 'ERROR_0006', message: err.message });
        }
    }

    cursoController.salvar = async (req, res) => {
        var client = await repository.conectar();
        const curso = new cursoModel(req.body);
        try {
            const result = await curso.save();
            return res.status(200).json({ code: 'SUCESS_0002', message: 'Curso cadastrado com sucesso' });
        } catch (err) {
            return res.status(400).json({ code: 'ERROR_0007', message: err.message });
        }
    }

    cursoController.alterar = async (req, res) => {
        try {
            var client = await repository.conectar();
            await cursoModel.updateOne({_id:req.body._id}, req.body)
            return res.status(200).json(req.body);
        } catch (err) {
            return res.status(400).json({ code: 'ERROR_0008', message: err.message });
        }
    }

    cursoController.alterarperguntascurso = async (req, res) => {
        
        try {
            var client = await repository.conectar();
            await cursoModel.updateOne({_id:req.body._id}, req.body)
            return res.status(200).json(req.body);
        } catch (err) {
            return res.status(400).json({ code: 'ERROR_0009', message: err.message });
        }
        
    }

    cursoController.excluir = async (req, res) => {
        try{
            const id = req.params.id
            var client = await repository.conectar();
            await cursoModel.deleteOne({ _id: id });
            return res.status(200).json({ code: 'SUCESS_0003', message: 'Curso excluído com sucesso' });
        }
        catch(err)
        {
            return res.status(400).json({ code: 'ERROR_0010', message: err.message });
        }
    }

    return cursoController;
}