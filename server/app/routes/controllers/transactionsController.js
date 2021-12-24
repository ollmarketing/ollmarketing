require('dotenv').config()
const axios = require('axios').default;
const { sha256 } =  require('js-sha256')
const app = require('../../../app');
const {
    ObjectID
} = require('mongodb');
const helper = require('../../helper');



module.exports = {
    getCollection: (req, res, next) => {
        req.Transactions = req.app.database.collection('Transactions');
        next();
    },

    createTransaction: async (req,res) => {
        const token = sha256(process.env.REACT_APP_TERMINAL_PASSWORD + req.body.paymentId + process.env.REACT_APP_TERMINAL_KEY);
        const data = Object.assign(req.body, {token, createdAt: new Date().toISOString()});
        const isExist = await req.Transactions.findOne({
            order: data.order,
        });

        if(!isExist) {
    
            await req.Transactions.insertOne(data);
        }

        res.status(200).json(req.body)
    },

    getTransactions: async (req,res) => {
        const transactions = await req.Transactions.find().toArray();

        res.status(200).json([transactions]);
    },

    getTransaction: async (req,res) => {
        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _transaction = await req.Transactions.findOne({
            _id: ObjectID(req.params.id)
        });


        if(!_transaction) {
            return res.status(400).json({error: "transaction is not exist"});
        }

        res.status(200).json(_transaction);
    },
    
    updateTransaction: async (req,res) => {

        if(!helper.isIdValid(req.params.id)) {
            return res.status(400).json({error: "id is not valid"});
        }

        const _transaction = await req.Transactions.findOne({
            _id: ObjectID(req.params.id)
        });

        if(!_transaction) {
            return res.status(400).json({error: "transaction is not exist"});
        }

        await req.Transactions.updateOne({
            _id: ObjectID(req.params.id)
        }, {$set: req.body});

        res.status(200).json(req.body);
    },

    getAndUpdateTransactionsStatus: async (database) => {
        try {
            let countOfUpdated = {
                REJECTED: 0,
                CANCELED: 0,
                CONFIRMED: 0,
                DELETED: 0,
            }
            const arrayIdsForDelete = [];

            console.log('start job: transactions')
            const transactions = await database.collection('Transactions').find({
                status: 'NOT_PAID',
            }).toArray();

            if(transactions.length > 0) {
                for(const key in transactions) {
                    const result = await axios.post('https://securepay.tinkoff.ru/v2/GetState', {
                        TerminalKey: "1618212597110DEMO",
                        PaymentId: transactions[key].paymentId,
                        Token: transactions[key].token,
                    });
        
                    if(result.data.Success === true && result.data.ErrorCode === '0') {
                        const status = result.data.Status
                        if(status === 'REJECTED' || status === 'CANCELED' || status === 'CONFIRMED') {
                            await database.collection('Transactions').updateOne({
                                _id: ObjectID(transactions[key]._id),
                            }, {$set: {
                                status
                            }});

                            countOfUpdated[status]++;
                        } else if(status === 'FORM_SHOWED') {
                            const date = new Date(new Date(transactions[key].createdAt).setMinutes(new Date(transactions[key].createdAt).getMinutes() + 60));
                            if(new Date > date) {
                                arrayIdsForDelete.push(ObjectID(transactions[key]._id));
                                countOfUpdated['DELETED']++;
                            }
                        }
                    }
                }

                await database.collection('Transactions').deleteMany({
                    _id: {$in: arrayIdsForDelete}
                })
            }

            console.log(`count of updated:\nconfirmed: ${countOfUpdated.CONFIRMED}\nrejected: ${countOfUpdated.REJECTED}\ncanceled: ${countOfUpdated.CANCELED}\ndeleted: ${countOfUpdated.DELETED}`);
            
        } catch(err) {
            console.log(err);
        }
        
    }

 }

