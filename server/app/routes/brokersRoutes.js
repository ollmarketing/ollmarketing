const { Router } = require('express');
const brokersController = require('./controllers/brokersController');
const passport = require('passport');
const passportFile = require('../../passport');
const router = Router();
const { validate, schemas } = require('../helper');

router.use(brokersController.getCollection);

router.route('/')
    .post(passport.authenticate('admin', {session: false}), brokersController.createBroker)
    .get(brokersController.getBrokers);

router.route('/:id')
    .get(brokersController.getBroker) 
    .put(passport.authenticate('admin', {session: false}), brokersController.updateBroker)
    .delete(passport.authenticate('admin', {session: false}), brokersController.deleteBroker);

    

module.exports = router;