const JWT = require('jsonwebtoken');
require('dotenv').config()
const {
    ObjectID
} = require('mongodb');
const bcrypt = require('../../bcrypt');
const helper = require('../../helper');

generateToken = (user) => {
    return JWT.sign({
        iss: 'Degram',
        subj: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 7)
    }, process.env.JWT_SECRET_KEY);
},


module.exports = {

    getCollection: (req, res, next) => {
        req.Admins = req.app.database.collection('Admins');
        next();
    },

    initialAdmin: async (req,res) => {
        const admins = await req.Admins.find().toArray();

        if(admins.length >= 1) {
            return res.status(400).json({ error: 'admin initialized' });
        }

        let admin = {
            username: 'admin',
            password: 'admin'
        }

        admin.username = (admin.username).toLowerCase();
        admin.password = await bcrypt.crypt(admin.password);

        await req.Admins.insertOne(admin);

        res.status(200).json({
            OK: 'OK'
        });
    },
    signIn: (req,res) => {
        const token = generateToken(req.user);
        res.status(200).json( {token} );
    },

    changePassword: async (req,res) => {
        const admins = await req.Admins.find().toArray();
        const admin = admins[0];
        const cryptedNewPassword = await bcrypt.crypt(req.body.password);

        await req.Admins.updateOne({
            _id: ObjectID(admin._id)
        }, {
            $set: {
                password: cryptedNewPassword
            }
        })

        res.status(200).json( {OK: 'OK'} );

    }, 

    authCheck: (req, res) => {
        res.status(200).json( {OK: 'OK'} );
    }   
 }