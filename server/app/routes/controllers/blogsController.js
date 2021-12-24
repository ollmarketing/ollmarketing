require('dotenv').config()
const {
    ObjectID
} = require('mongodb');
const helper = require('../../helper');


module.exports = {
    getCollection: (req, res, next) => {
        req.Blogs = req.app.database.collection('Blogs');
        next();
    },

    createBlog: async (req,res) => {
        const data = Object.assign(req.body, {createdAt: new Date().toISOString()});
        await req.Blogs.insertOne(data);

        res.status(200).json(req.body)
    },

    getBlogs: async (req,res) => {
        const blogs = await req.Blogs.find().toArray();

        res.status(200).json([blogs]);
    },

    getBlog: async (req,res) => {
        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _blog = await req.Blogs.findOne({
            _id: ObjectID(req.params.id)
        });


        if(!_blog) {
            return res.status(400).json({error: "blog is not exist"});
        }

        res.status(200).json(_blog);
    },
    
    updateBlog: async (req,res) => {

        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _blog = await req.Blogs.findOne({
            _id: ObjectID(req.params.id)
        });

        if(!_blog) {
            return res.status(400).json({error: "blog is not exist"});
        }

        await req.Blogs.updateOne({
            _id: ObjectID(req.params.id)
        }, {$set: req.body});

        res.status(200).json(req.body);
    },

    deleteBlog: async (req,res) => {
        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _blog = await req.Blogs.findOne({
            _id: ObjectID(req.params.id)
        });

        if(!_blog) {
            return res.status(400).json({error: "blog is not exist"});
        }

        await req.Blogs.deleteOne({
            _id: ObjectID(req.params.id)
        });

        res.status(200).json({OK: 'deleted'});
    },

    getByTags: async (req,res) => {
        const data = req.body
        const blogs = await req.Blogs.find({
            tags: {$in: data.tags},
            _id: {$ne: ObjectID(data.currentBlogId)},
            visible: true,
        }).toArray();

        res.status(200).json([blogs]);
    }
 }

