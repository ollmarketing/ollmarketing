const { Router } = require('express');
const transactionsController = require('./controllers/transactionsController');
const passport = require('passport');
const passportFile = require('../../passport');
const router = Router();
const { validate, schemas } = require('../helper');

router.use(transactionsController.getCollection);


router.route('/')
    .get(transactionsController.getTransactions)
    .post(transactionsController.createTransaction);

    

module.exports = router;