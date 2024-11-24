const respuesta = require('./respuestas');

function errors(err, req, res, _next) { // Agregamos 'res' aquí
    console.error('[error]', err); // Corregido el cierre del corchete

    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;

    respuesta.error(req, res, message, status); // Ahora 'res' está definido
}

module.exports = errors;
