const { Router } = require('express');
const userController = require('./controllers/userController');
const passport = require('passport');
const passportFile = require('../../passport');
const mailController = require('./controllers/mailController');
const router = Router();

router.use(userController.getCollection);

router.route('/')
    .get(userController.getUsers)

router.route('/paid')
    .get(userController.getPaidUsers)

router.route('/signIn')
    .post(passport.authenticate('local', { session: false }), userController.signIn);

router.route('/signUp')
    .post(userController.signUp)

/*router.route('/changePassword')
    .put(passport.authenticate('jwt', { session: false }), userController.changePassword); */

router.route('/authCheck')
    .get(passport.authenticate('jwt', { session: false }), userController.authCheck);

router.route('/confirmationMail')
    .post(mailController.confirmation);

router.route('/confirmation/:id')
    .post(userController.confirmation);

router.route('/changePasswordMail')
    .post(mailController.changePassword);

router.route('/changePassword/:id')
    .get(userController.getUserIdViaJWT)
    .put(userController.changePassword);



    
    

module.exports = router;