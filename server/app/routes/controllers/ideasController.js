require('dotenv').config()
const {
    ObjectID
} = require('mongodb');
const helper = require('../../helper');
const {getAndSaveIdeas} = require('./sqlLiteController')
const axios = require('axios').default


module.exports = {
    getCollection: (req, res, next) => {
        req.Ideas = req.app.database.collection('Ideas');
        req.Traders = req.app.database.collection('Traders')
        next();
    },

    getIdeas: async (req,res) => {
        const ideas = await req.Ideas.find().toArray();

        res.status(200).json([ideas]);
    },

    getIdea: async (req,res) => {
        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _idea = await req.Ideas.findOne({
            _id: ObjectID(req.params.id)
        });

        if(!_idea) {
            return res.status(400).json({error: "idea is not exist"});
        }

        res.status(200).json(_idea);
    },

    getByTraderId: async (req, res) => {
        const traderId = req.params.id;
        const trader = await req.Traders.findOne({
            _id: ObjectID(traderId),
        });

        if(!trader) {
            return res.status(400).json({error: "trader is not exist"});
        }

        const ideas = await req.Ideas.find({
            author: trader.name,
        }).toArray();

        res.status(200).json([ideas]);
    },

    schedule: async (req, res) => {
        try {
            console.log('start saving ideas from sql');
            const ourBdRes = await req.Ideas.find().toArray();
            const result = await axios.get(process.env.EXTERNAL_API_PATH + '/ideas_list/');
            const ideas = result.data;
    
            ideas.map((elem) => delete elem.id)
            ourBdRes.map((elem) => delete elem._id)
    
            if(JSON.stringify(ourBdRes) === JSON.stringify(ideas)) {
                console.log('no new data available');
            } else {
                const data = [];
                
                ideas.forEach(iElem => {
                    if(ourBdRes.every(oElem => oElem.date_posted !== iElem.date_posted)) {
                        data.push(iElem);
                    }
                })

                if(data.length > 0) {
                    await req.Ideas.insertMany(data);
                }

                console.log(`saved ${data.length} ideas`); 
            } 
        } catch(err) {
            console.log(err);
        }

        res.status(200).json('ok')
    }
 }