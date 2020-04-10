const routes = require('../routes');
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');


console.log("==> Iniciando aplicacao...");

app.use((req, res, next) => {
  console.log(">> Requisicao (" + req.method + "): " + req.path);
  next();
})
app.use(session({ secret: 'estagio', saveUninitialized: true }));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(routes);
app.listen(3000);