const router = require('express').Router();
const api = require('../controllers/Api');

/* GET home page. */
router.post('/item', api.getItem);

router.post('/user', api.getUser);

module.exports = router;
