const { Router } = require('express');
const uploadController = require('./controllers/uploadController');
const passport = require('passport');
const passportFile = require('../../passport');
const router = Router();
const { validate, schemas } = require('../helper');


router.route('/')
    .post(uploadController.upload)
    .get(uploadController.getUpload);
    

module.exports = router;