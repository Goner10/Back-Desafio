const express = require('express');
const NewsController = require('../controllers/NewsController');
const { authentication } = require('../middleware/authentication');

const router = express.Router();

router.post('/create', NewsController.create);
router.get('/all', NewsController.getAll);
router.get('/latest', NewsController.getLatest);
router.get('/byId/:_id', NewsController.getById);
router.put('/update/:_id', authentication, NewsController.update);
router.delete('/delete/:_id', authentication, NewsController.delete);

module.exports = router;
 