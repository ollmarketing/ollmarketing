const { Router } = require('express');
const blogsController = require('./controllers/blogsController');
const passport = require('passport');
const passportFile = require('../../passport');
const router = Router();
const { validate, schemas } = require('../helper');

router.use(blogsController.getCollection);

router.route('/')
    .post(passport.authenticate('admin', {session: false}), blogsController.createBlog)
    .get(blogsController.getBlogs);

router.route('/tag')
    .post(blogsController.getByTags);

router.route('/:id')
    .get(blogsController.getBlog) 
    .put(passport.authenticate('admin', {session: false}), blogsController.updateBlog)
    .delete(passport.authenticate('admin', {session: false}), blogsController.deleteBlog);


    

module.exports = router;