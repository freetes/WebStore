const router = require('express').Router();
const user = require('../controllers/User');

/* GET users listing. */

router.get('/info', user.getInfo);

router.post('/info', user.changeInfo);

router.get('/shopcar', user.shopcar);

router.get('/order', user.getOrder);

module.exports = router;
