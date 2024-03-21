const csvController = require('../controllers/fileCsv.controller');
const { isLoggedIn } = require('../middleware/auth');

module.exports = app => {
  const router = require('express').Router();

  router.get('/get', csvController.getCsv);

  router.get('/getallespace', csvController.getAllEspace);

  router.get('/getjeu/:planZone', csvController.getJeuByEspace)

  router.post('/post', isLoggedIn, csvController.importCsv);

  app.use('/csv', router);
};