const router = require('express').Router();

const { AdoptController } = require('../controllers');
const { isAuthenticated } = require('../middlewares');

router.post('/:idPet', isAuthenticated, AdoptController.add);
router.delete('/:idPet', isAuthenticated, AdoptController.delete);

module.exports = router;
