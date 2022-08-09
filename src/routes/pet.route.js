const router = require('express').Router();

const { PetController } = require('../controllers');
const { isAuthenticated } = require('../middlewares');

router.get('/filter', PetController.getAllFilter);
router.get('/:idPet', PetController.getDetail);
router.put('/:idPet', isAuthenticated, PetController.update);
router.delete('/:idPet', isAuthenticated, PetController.delete);
router.get('/', PetController.getAll);
router.post('/', isAuthenticated, PetController.add);

module.exports = router;
