const express = require('express');

const { authentication } = require('../middleware/authentication');
const CourseController = require('../Controllers/CourseController');


const router = express.Router();

router.post('/create', CourseController.create);
//acordarse de tener en cuenta que para canal de difusion el crarlo solo podran admins y el modificarlo solo autor del canaldif o superadmin
router.put('/update/:_id', authentication, CourseController.update);
router.delete('/delete/:_id', authentication, CourseController.delete);

module.exports = router;
