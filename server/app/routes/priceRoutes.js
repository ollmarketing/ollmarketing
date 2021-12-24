const { Router } = require('express');
const pricesController = require('./controllers/pricesController');
const passport = require('passport');
const passportFile = require('../../passport');
const router = Router();
const { validate, schemas } = require('../helper');

router.use(pricesController.getCollection);

router.route('/')
    .get(pricesController.getPrice) 
    .put(pricesController.updatePrice)
    .post(pricesController.createPrice);

router.route('/rate')
    .get(pricesController.getRate);

    

module.exports = router;