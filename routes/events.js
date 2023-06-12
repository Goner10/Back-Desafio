const express = require('express');
const EventController = require('../controllers/EventController');
const { authentication,isEventCreator } = require('../middleware/authentication');

const router = express.Router();

router.post('/create',EventController.create);
// router.post('/create', authentication,isAdmin,iscandifCreator,canaldifController.create);
router.get('/all', EventController.getAll);
router.get('/byId/:id', EventController.getById);
router.put('/update/:id', authentication, EventController.update);
router.delete('/delete/:id', authentication, EventController.delete);
router.post('/attend/:id', authentication, EventController.attend);

module.exports = router;
