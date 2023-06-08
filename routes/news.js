const express = require('express');
const NewsController = require('../controllers/NewsController');
const { authentication } = require('../middleware/authentication');

const router = express.Router();

router.post('/create', authentication, NewsController.create);
router.get('/all', NewsController.getAll);
router.get('/latest', NewsController.getLatest);
router.get('/byId/:id', NewsController.getById);
router.put('/update/:id', authentication, NewsController.update);
router.delete('/delete/:id', authentication, NewsController.delete);

module.exports = router;
 