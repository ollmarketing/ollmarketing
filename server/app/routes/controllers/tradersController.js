require('dotenv').config()
const {
    ObjectID
} = require('mongodb');
const helper = require('../../helper');
const axios = require('axios').default



module.exports = {
    getCollection: (req, res, next) => {
        req.Traders = req.app.database.collection('Traders');
        next();
    },

    getTraders: async (req,res) => {
        const traders = await req.Traders.find().toArray();

        res.status(200).json([traders]);
    },

    getTrader: async (req,res) => {
        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _trader = await req.Traders.findOne({
            _id: ObjectID(req.params.id)
        });

        if(!_trader) {
            return res.status(400).json({error: "trader is not exist"});
        }

        res.status(200).json(_trader);
    },

    schedule: async (req, res) => {
        try {
            console.log('start saving traders from sql');
            const ourBdRes = await req.Traders.find().toArray();
            const result = await axios.get(process.env.EXTERNAL_API_PATH + '/traders/');
            const traders = result.data;
    
            ourBdRes.map((elem) => delete elem._id)
    
            if(JSON.stringify(ourBdRes) === JSON.stringify(traders)) {
                console.log('no new data available');
            } else {
                const data = [];
                const dataForUpdate = [];
                
                traders.forEach(tElem => {
                    if(ourBdRes.every(oElem => oElem.id !== tElem.id)) {
                        data.push(tElem);
                    } else if (ourBdRes.every(oElem => oElem.ideas_count !== tElem.ideas_count || oElem.successful_count !== tElem.successful_count ||  oElem.percentage !== tElem.percentage)) {
                        dataForUpdate.push(tElem)
                    }
                })

                if(data.length > 0) {
                    await req.Traders.insertMany(data);
                }

                if(dataForUpdate.length > 0) {
                    dataForUpdate.map(async (elem) => {
                        await req.Traders.updateOne({
                            name: elem.name
                        }, {$set: elem})
                    })
                }
                console.log(`saved ${data.length} traders`); 
                console.log(`updated ${dataForUpdate.length} traders`)
            } 
        } catch(err) {
            console.log(err);
        }

        res.status(200).json('ok')
    }
 }