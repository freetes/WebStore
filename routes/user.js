const router = require('express').Router();
const user = require('../controllers/User');

/* GET users listing. */

router.get('/info', user.getInfo);

router.post('/info', user.changeInfo);

router.get('/shopcar', user.shopcar);

router.post('/addItemToShopCar', user.addItem);

router.get('/order', user.getOrder);

router.post('/order', user.newOrder);

module.exports = router;
