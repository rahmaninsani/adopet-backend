const router = require('express').Router();

const { PetController } = require('../controllers');
const { isAuthenticated } = require('../middlewares');

router.get('/', PetController.getAll);
router.post('/', isAuthenticated, PetController.add);

module.exports = router;
