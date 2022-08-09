const router = require('express').Router();

const { PetController } = require('../controllers');
const { isAuthenticated } = require('../middlewares');

router.get('/', PetController.getAll);
router.post('/', isAuthenticated, PetController.add);
router.get('/:idPet', PetController.getDetail);
router.put('/:idPet', isAuthenticated, PetController.update);

module.exports = router;
