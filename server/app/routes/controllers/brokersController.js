require('dotenv').config()
const {
    ObjectID
} = require('mongodb');
const helper = require('../../helper');


module.exports = {
    getCollection: (req, res, next) => {
        req.Brokers = req.app.database.collection('Brokers');
        next();
    },

    createBroker: async (req,res) => {
        await req.Brokers.insertOne(req.body);

        res.status(200).json(req.body)
    },

    getBrokers: async (req,res) => {
        const brokers = await req.Brokers.find().toArray();

        res.status(200).json([brokers]);
    },

    getBroker: async (req,res) => {
        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _broker = await req.Brokers.findOne({
            _id: ObjectID(req.params.id)
        });

        if(!_broker) {
            return res.status(400).json({error: "broker is not exist"});
        }

        res.status(200).json(_broker);
    },
    
    updateBroker: async (req,res) => {

        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _broker = await req.Brokers.findOne({
            _id: ObjectID(req.params.id)
        });

        if(!_broker) {
            return res.status(400).json({error: "broker is not exist"});
        }

        await req.Brokers.updateOne({
            _id: ObjectID(req.params.id)
        }, {$set: req.body});

        res.status(200).json(req.body);
    },

    deleteBroker: async (req,res) => {
        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _broker = await req.Brokers.findOne({
            _id: ObjectID(req.params.id)
        });

        if(!_broker) {
            return res.status(400).json({error: "broker is not exist"});
        }

        await req.Brokers.deleteOne({
            _id: ObjectID(req.params.id)
        });

        res.status(200).json({OK: 'deleted'});
    },
 }