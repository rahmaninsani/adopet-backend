const router = require('express').Router();

const { isAuthenticated } = require('../middlewares');

const signupRoute = require('./signup.route');
const signinRoute = require('./signin.route');
const petRoute = require('./pet.route');

router.use('/signup', signupRoute);
router.use('/signin', signinRoute);
router.use('/pets', isAuthenticated, petRoute);
router.use('*', (req, res) => {
  res.status(404).json({
    code: res.statusCode,
    status: 'Not Found',
  });
});

module.exports = router;
