const router = require('express').Router();

const { AuthController } = require('../controllers');

router.post('/', AuthController.signin);

module.exports = router;
