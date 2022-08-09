const router = require('express').Router();

const { PetController } = require('../controllers');
const { isAuthenticated } = require('../middlewares');

router.get('/', PetController.getAll);
router.get('/:idPet', PetController.getDetail);
router.post('/', isAuthenticated, PetController.add);
router.put('/:idPet', isAuthenticated, PetController.update);
router.delete('/:idPet', isAuthenticated, PetController.delete);

module.exports = router;
