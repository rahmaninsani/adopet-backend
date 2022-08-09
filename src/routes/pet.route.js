const router = require('express').Router();

const { PetController } = require('../controllers');

router.get('/', PetController.getAll);

module.exports = router;
