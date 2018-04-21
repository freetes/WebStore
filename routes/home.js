const router = require('express').Router();
const home = require('../controllers/Home');

/* GET home page. */
router.get('/', home.index);

router.get('/allitem', home.allitem);

router.get('/item', home.item);

router.get('/search', home.search);

router.get('/signin', home.signinGet);

router.post('/signin', home.signinPost);

router.post('/signup', home.signupPost);

module.exports = router;
