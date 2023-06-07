const express = require('express');
const canalDifusionController = require('../controllers/CanalDifusionController');

const router = express.Router();

router.post('/', canalDifusionController.create);
router.get('/', canalDifusionController.getAll);
router.get('/:id', canalDifusionController.getById);
router.put('/:id', canalDifusionController.update);
router.delete('/:id', canalDifusionController.delete);

module.exports = router;
