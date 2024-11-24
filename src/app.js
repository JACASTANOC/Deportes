const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');

const deportes = require('./modulos/deportes/rutas')

const error = require('./red/errors');


const app = express();


//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//configuracion
app.set('port', config.app.port)


//rutas
app.use('/api/deportes', deportes);



app.use(error);

module.exports = app;