const routing = require('express').Router();
var usuarioController = require('../controllers/usuarioController')()
var cursoController = require('../controllers/cursoController')()
var paginaController = require('../controllers/paginaController')()
var perguntaController = require('../controllers/perguntaController')()

routing.get('/usuarios', usuarioController.listar)
routing.post('/usuarios', usuarioController.salvar)
routing.put('/usuarios', usuarioController.alterar)
routing.delete('/usuarios/:id', usuarioController.excluir)

routing.get('/cursos', cursoController.listar)
routing.get('/cursoscomperguntas', cursoController.listarcursos)
routing.post('/cursos', cursoController.salvar)
routing.put('/cursos', cursoController.alterar)
routing.put('/perguntascursos', cursoController.alterarperguntascurso)
routing.delete('/cursos/:id', cursoController.excluir)

routing.get('/paginas', paginaController.listar)
routing.post('/paginas', paginaController.salvar)
routing.put('/paginas', paginaController.alterar)
routing.delete('/paginas/:id', paginaController.excluir)
routing.get('/paginas/:id', paginaController.buscarid)

routing.post('/perguntas', perguntaController.salvar)

module.exports = routing