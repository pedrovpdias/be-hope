const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const IncidentDetailController = require('./controllers/IncidentDetailController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const OngProfileController = require('./controllers/OngProfileController');

const StatesController = require('./controllers/StatesController');
const CitiesController = require('./controllers/CitiesController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents/:any', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.put('/incidents', IncidentController.update);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/incident/detail/:id', IncidentDetailController.index);

routes.get('/profile', ProfileController.index);

routes.get('/ong-profile/:id', OngProfileController.index);
routes.put('/ong-profile', OngProfileController.update);

routes.get('/states', StatesController.index);
routes.get('/cities/:id', CitiesController.index);

module.exports = routes;
