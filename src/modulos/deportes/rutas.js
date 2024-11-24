const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

// Rutas
router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/:id', actualizar); // Cambié de eliminar a actualizar
router.delete('/:id', eliminar); // Usar DELETE para eliminar

async function todos(req, res, next) {
    try {
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}

async function uno(req, res, next) {
    try {
        const items = await controlador.uno(req.params.id);
        if (!items.length) {
            return respuesta.error(req, res, 'Deporte no encontrado', 404);
        }
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}

async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body);
        const mensaje = req.body.id == 0 ? 'item guardado con exito' : 'item actualizado con exito';
        respuesta.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);
    }
}

async function actualizar(req, res, next) {
    try {
        const items = await controlador.actualizar(req.params.id, req.body);
        respuesta.success(req, res, 'item actualizado con exito', 200);
    } catch (err) {
        next(err);
    }
}

async function eliminar(req, res, next) {
    try {
        await controlador.eliminar(req.params.id); // Asegúrate de pasar el ID
        respuesta.success(req, res, 'item eliminado', 200);
    } catch (err) {
        next(err);
    }
}

module.exports = router;
