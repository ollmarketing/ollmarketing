require('dotenv').config()
const {
    ObjectID
} = require('mongodb');
const fs = require('fs');
const contentDisposition = require('content-disposition');


const helper = require('../../helper');


module.exports = {
    upload: async (req, res) => {
        for (const key in req.files) {
            for(let i = 0; i < req.files[key].length; i++) {
                req.files[key][i].mv('./media/' + req.files[key][i].name);
                
            }
            if(req.files[key].length == undefined) {
                await req.files[key].mv('./media/' + req.files[key].name);
                //console.log(req.files[key]);
                console.log(Buffer.from(req.files[key].data));
                
            }

            
        } 
        res.status(200).json({OK : 'ok'})
    },

    getUpload: (req,res) => {
        const filePath =  './media/' + req.query.load 
        const fileName = req.query.load;

        fs.exists(filePath, function(exists){
            if (exists) {     
                res.writeHead(200, {
                    'Content-Disposition' : contentDisposition(fileName)
                });
                fs.createReadStream(filePath).pipe(res);
            } else {
                res.writeHead(400, {"Content-Type": "text/plain"});
                res.end("ERROR File does not exist");
            }
        });
    },
 }