const { Router } = require('express');
const tradersController = require('./controllers/tradersController');
const passport = require('passport');
const passportFile = require('../../passport');
const router = Router();
const { validate, schemas } = require('../helper');


router.use(tradersController.getCollection);

router.route('/')
    .get(tradersController.getTraders);

router.route('/schedule')
    .post(tradersController.schedule)

router.route('/:id')
    .get(tradersController.getTrader) 

    

module.exports = router;