const router = require('express').Router();

const { AuthController } = require('../controllers');

router.post('/', AuthController.signup);

module.exports = router;
