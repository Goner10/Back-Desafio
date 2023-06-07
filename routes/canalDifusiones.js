const express = require('express');
const canalDifusionController = require('../controllers/CanalDifusionController');
const { authentication, isAdmin,modCanDif } = require('../middleware/authentication');

const router = express.Router();

router.post('/create' ,canalDifusionController.create);
router.get('/all', canalDifusionController.getAll);
router.get('/:_id', canalDifusionController.getById);
router.put('/update/:id',authentication,modCanDif ,canalDifusionController.update);
router.delete('/delete/:id', canalDifusionController.delete);

module.exports = router;
