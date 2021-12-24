require('dotenv').config()
const {
    ObjectID
} = require('mongodb');
const helper = require('../../helper');


module.exports = {
    getCollection: (req, res, next) => {
        req.Prices = req.app.database.collection('Prices');
        req.Rate = req.app.database.collection('Rate');
        next();
    },

    createPrice: async (req,res) => {
        await req.Prices.insertOne(req.body);

        res.status(200).json(req.body)
    },

    getPrices: async (req,res) => {
        const prices = await req.Prices.find().toArray();

        res.status(200).json([prices]);
    },

    getPrice: async (req,res) => {

        const _price = await req.Prices.find().toArray();

        if(!_price) {
            return res.status(400).json({error: "price is not exist"});
        }

        res.status(200).json(_price[0]);
    },
    
    updatePrice: async (req,res) => {
        await req.Prices.updateMany({}, {$set: req.body});

        res.status(200).json(req.body);
    },

    getRate: async (req, res) => {
        const rate = await req.Rate.find().toArray();

        res.status(200).json(rate[0].rate)
    }
 }