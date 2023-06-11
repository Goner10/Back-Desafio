const express = require('express');
const tagController = require('../controllers/TagController');

const router = express.Router();

router.post('/create', tagController.create);
router.get('/all', tagController.getAll);
router.get('/:_id', tagController.getById);
router.put('/update/:id', tagController.update);
router.delete('/delete/:id', tagController.delete);

module.exports = router;
