const express = require('express');
const CommentController = require('../controllers/CommentController');
const { authentication, isAdmin } = require('../middleware/authentication');

const router = express.Router();

router.post('/create', authentication, CommentController.create);
router.put('/update/:_id', authentication, CommentController.update);
router.delete('/delete/:_id', authentication, CommentController.delete);

module.exports = router;
