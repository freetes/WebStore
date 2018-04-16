const router = require('express').Router();
const owner = require('../controllers/Owner');

router.get('/additem', owner.addItem);

module.exports = router;
