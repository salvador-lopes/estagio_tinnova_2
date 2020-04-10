const express = require('express');
const routes = express.Router();
const ClienteController = require('./src/controllers/ClienteController');
const CaixaController = require('./src/controllers/CaixaController');
const SessionController = require('./src/controllers/SessionController');

routes.post('/clientes', ClienteController.create);
routes.delete('/clientes/:id', ClienteController.delete);
routes.get('/clientes', ClienteController.lista);
routes.put('/clientes/:id', ClienteController.edita);
routes.put('/caixa-eletronico', CaixaController.saca);
routes.post('/login', SessionController.autentica);

module.exports = routes;