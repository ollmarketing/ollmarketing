const { Router } = require('express');
const reportsController = require('./controllers/reportsController');
const passport = require('passport');
const passportFile = require('../../passport');
const router = Router();
const { validate, schemas } = require('../helper');

router.use(reportsController.getCollection);

router.route('/')
    .post(passport.authenticate('admin', {session: false}), reportsController.createReport)
    .get(reportsController.getReports);

router.route('/:id')
    .get(reportsController.getReport) 
    .put(passport.authenticate('admin', {session: false}), reportsController.updateReport)
    .delete(passport.authenticate('admin', {session: false}), reportsController.deleteReport);

    

module.exports = router;