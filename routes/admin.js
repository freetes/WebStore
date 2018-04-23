const router = require('express').Router();
const admin = require('../controllers/Admin');

/* GET home page. */
router.post('/addUser', admin.addUser);

router.post('/deleteUser', admin.deleteUser);

module.exports = router;
