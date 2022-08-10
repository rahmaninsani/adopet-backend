const router = require('express').Router();

const { UserController } = require('../controllers');

router.get('/my-pets', UserController.getAll);
router.get('/my-pets/:idPet', UserController.getDetail);
router.put('/my-pets/:idPet/:idAdopter', UserController.update);

// router.get('/adoption-history', isAuthenticated, UserController.getDetail);
// router.get('/adoption-history/:idPet', isAuthenticated, UserController.getDetail);

module.exports = router;
