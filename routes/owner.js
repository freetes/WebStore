const router = require('express').Router();
const owner = require('../controllers/Owner');

router.get('/additem', owner.addItem);

router.post('/additemPost', owner.addItemPost);

router.get('/myadd', owner.getAdd);

router.get('/order', owner.getOrder);

router.post('/deleteItem', owner.deleteItem);

module.exports = router;
