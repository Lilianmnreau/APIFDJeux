const controller = require('../controllers/creneau_benevole.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();

    router.post('/',  controller.inscription)

    router.put('/isPresent', controller.changeisPresent)

    router.get('/:CreneauId', isLoggedIn, controller.getbenevoles)

    router.get('/isInscrit/:idUser/:idCreneau', controller.isInscrit)

    router.delete('/', controller.desinscription)

    router.get('/getbenevoles/:idCreneau',controller.getbenevoles)

    router.get('/getcreneaux/:UserId',controller.getcreneaux)

    app.use('/creneau_benevole', router);
}   