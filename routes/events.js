const express = require('express');
const EventController = require('../controllers/EventController');
const { authentication } = require('../middleware/authentication');

const router = express.Router();

router.post('/create', authentication, EventController.create);
router.get('/all', EventController.getAll);
router.get('/:_id', EventController.getById);
router.put('/update/:_id', authentication, EventController.update);
router.delete('/delete/:_id', authentication, EventController.delete);
router.post('/attend/:_id', authentication, EventController.attend);

module.exports = router;
