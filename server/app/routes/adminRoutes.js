const { Router } = require('express');
const adminController = require('./controllers/adminController');
const passport = require('passport');
const passportFile = require('../../passport');
const router = Router();
const { validate, schemas } = require('../helper');
const { route } = require('../../passport');
router.use(adminController.getCollection);

router.route('/')
    .get()

router.route('/initial')
    .post(adminController.initialAdmin);

router.route('/authCheck')
    .get(passport.authenticate('admin', {session: false}), adminController.authCheck)

router.route('/signIn')
    .post(passport.authenticate('local', { session: false }), adminController.signIn);

router.route('/changePassword')
    .put(passport.authenticate('admin', { session: false }), adminController.changePassword);

module.exports = router;