const express = require('express');
const CommentController = require('../controllers/CommentController');
const { authentication } = require('../middleware/authentication');


const router = express.Router();

router.post('/create', authentication, CommentController.create);
//acordarse de tener en cuenta que para canal de difusion el crarlo solo podran admins y el modificarlo solo autor del canaldif o superadmin
router.put('/update/:id', authentication, CommentController.update);
router.delete('/delete/:id', authentication, CommentController.delete);

module.exports = router;
