const express = require('express');
const canalDifusionController = require('../controllers/CanalDifusionController');

const router = express.Router();

// Ruta para crear un canal de difusión
router.post('/', canalDifusionController.create);

// Ruta para obtener todos los canales de difusión
router.get('/', canalDifusionController.getAll);

// Ruta para obtener un canal de difusión por ID
router.get('/:id', canalDifusionController.getById);

// Ruta para actualizar un canal de difusión por ID
router.put('/:id', canalDifusionController.update);

// Ruta para eliminar un canal de difusión por ID
router.delete('/:id', canalDifusionController.delete);

module.exports = router;
