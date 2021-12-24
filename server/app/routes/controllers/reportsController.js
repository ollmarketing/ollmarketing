require('dotenv').config()
const {
    ObjectID
} = require('mongodb');
const helper = require('../../helper');


module.exports = {
    getCollection: (req, res, next) => {
        req.Reports = req.app.database.collection('Reports');
        next();
    },

    createReport: async (req,res) => {
        await req.Reports.insertOne(req.body);

        res.status(200).json(req.body)
    },

    getReports: async (req,res) => {
        const reports = await req.Reports.find().toArray();

        res.status(200).json([reports]);
    },

    getReport: async (req,res) => {
        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _report = await req.Reports.findOne({
            _id: ObjectID(req.params.id)
        });

        if(!_report) {
            return res.status(400).json({error: "report is not exist"});
        }

        res.status(200).json(_report);
    },
    
    updateReport: async (req,res) => {

        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _report = await req.Reports.findOne({
            _id: ObjectID(req.params.id)
        });

        if(!_report) {
            return res.status(400).json({error: "report is not exist"});
        }

        await req.Reports.updateOne({
            _id: ObjectID(req.params.id)
        }, {$set: req.body});

        res.status(200).json(req.body);
    },

    deleteReport: async (req,res) => {
        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _report = await req.Reports.findOne({
            _id: ObjectID(req.params.id)
        });

        if(!_report) {
            return res.status(400).json({error: "report is not exist"});
        }

        await req.Reports.deleteOne({
            _id: ObjectID(req.params.id)
        });

        res.status(200).json({OK: 'deleted'});
    },
 }