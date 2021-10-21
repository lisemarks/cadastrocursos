const express = require('express')
const keySecret = 'BarberInCutCursos';
const repository = require('./database/database')()
var jwt = require('jsonwebtoken');

const app = express()
const port = 80

app.use(express.json())

app.post('/login', async (req, res) => {
  var user = req.body
  
  await repository.conectar();
  
  const usuarioModel = require("./models/usuario");

  var userdb = await usuarioModel.findOne({ login: user.login, senha: user.senha }).exec()
  if (userdb === null) 
  {  
    return res.status(403).json({ autenticacao: false, message: 'Usuário não encontrado.', code: 'ERROR_0003' });
  }
  else
  {
      delete user.senha
      user.autenticacao = true
      user.message = 'Login efetuado com sucesso'
      user.code = 'SUCESS_0001'
      var token = jwt.sign({ user }, keySecret, {
        expiresIn: 12000
      });
      user.token = token
      return res.status(200).json(user);
  }
})

function validarToken(req, res, next) {
  var token = req.headers['token'];
  if (!token) {
    return res.status(401).json({ autenticacao: false, message: 'É necessário enviar o token.', code: 'ERROR_0001' });
  }
  jwt.verify(token, keySecret, function (err, payload) {
    if (err) {
      console.log(err)
      return res.status(500).json({ autenticacao: false, message: err.message, code: 'ERROR_0002' });
    }
    req.user = payload.user
    next();
  });
}

const routing = require('./router/routing')

app.use(validarToken, routing)

app.use(function (err, req, res, next) {
  res.status(err.httpStatusCode || 500).json({ code: err.code, message: err.message })
});

app.listen((process.env.PORT || 5000), function(){
  console.log('listening on *:5000');
});

// app.listen(port, () => {
//   console.log(`Aplicação rodando em http://localhost:${port}`)
// })