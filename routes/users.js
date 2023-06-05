const express = require('express');
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../Middleware/authentication');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', authentication, UserController.me);
router.put('/update/:_id', authentication, UserController.update);
router.delete('/delete/:_id', [authentication, isAdmin], UserController.delete);

module.exports = router;
