const tabla = 'deportes';

module.exports = function (dbInyectada) {
    let db = dbInyectada;

    if (!db) {
        db = require('../../DB/mysql');
    }

    function todos() {
        return db.todos(tabla);
    }

    function uno(id) {
        return db.uno(tabla, id);
    }

    function agregar(body) {
        return db.agregar(tabla, body);
    }

    function eliminar(id) {
        return db.eliminar(tabla, id);
    }

    function actualizar(id, body) {
        return db.actualizar(tabla, { id, ...body });
    }

    return {
        todos,
        uno,
        agregar,
        eliminar,
        actualizar,
    };
};
