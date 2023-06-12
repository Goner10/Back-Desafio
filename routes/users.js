const express = require('express');
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middleware/authentication');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getAll', UserController.getAll);
router.get('/user/:_id', UserController.userInfoById);
router.get('/userLogged', authentication, UserController.getInfo);
router.put('/firstOnBoard', authentication, UserController.updateFirstOnBoard);
router.delete('/logout', authentication, UserController.logout);
router.put('/update', authentication, UserController.update);
router.delete('/delete/:_id', [authentication, isAdmin], UserController.delete);

module.exports = router;
