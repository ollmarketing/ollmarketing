const { Router } = require('express');
const ideasController = require('./controllers/ideasController');
const passport = require('passport');
const passportFile = require('../../passport');
const router = Router();
const { validate, schemas } = require('../helper');
const { get } = require('../../passport');
const sqlLiteController = require('./controllers/sqlLiteController')

router.use(ideasController.getCollection);

router.route('/')
    .get(ideasController.getIdeas);

router.route('/schedule')
    .post(ideasController.schedule)


router.route('/trader/:id')
    .get(ideasController.getByTraderId);

router.route('/:id')
    .get(ideasController.getIdea) 



    

module.exports = router;