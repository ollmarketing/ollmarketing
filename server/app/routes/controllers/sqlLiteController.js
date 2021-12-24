require('dotenv').config()
const axios = require('axios').default
const helper = require('../../helper');
const app = require('../../../app');

axios.defaults.baseURL = process.env.EXTERNAL_API_PATH;

module.exports = {
    getAndSaveIdeas: async () => {
        try {
            console.log('start saving ideas from sql');
            const ourBdRes = await app.database.collection('Ideas').find().toArray();
            const result = await axios.get('/ideas_list/');
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
                    await app.database.collection('Ideas').insertMany(data);
                }

                console.log(`saved ${data.length} ideas`); 
            } 
        } catch(err) {
            console.log(err);
        }

        return any;
    },

    getAndSaveTraders: async () => {
        try {
            console.log('start saving traders from sql');
            const ourBdRes = await app.database.collection('Traders').find().toArray();
            const result = await axios.get('/traders/');
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
                    await app.database.collection('Traders').insertMany(data);
                }

                if(dataForUpdate.length > 0) {
                    dataForUpdate.map(async (elem) => {
                        await app.database.collection('Traders').updateOne({
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
        
    }
        
 }