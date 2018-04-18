const router = require('express').Router();
const owner = require('../controllers/Owner');

router.get('/additem', owner.addItem);

router.post('/additem', owner.addItemPost);

router.get('/myadd', owner.getAdd);

module.exports = router;
