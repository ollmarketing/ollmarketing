const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
require('dotenv').config()
const { ObjectID } = require('mongodb');
const bcrypt = require('./app/bcrypt');

const pass = express();

pass.on('mount', server => {
    pass.database = server.database;
});

//JWT

passport.use('jwt', new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET_KEY
}, async (payload, done) => {
    try {
        const user = await pass.database.collection('Users').findOne({
            _id: ObjectID(payload.subj._id)
        });

        if (!user) {
            return done(null, false);
        }

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.use('admin', new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('admin'),
    secretOrKey: process.env.ADMIN_TOKEN
}, async (payload, done) => {
    try {
        const user = await pass.database.collection('Users').findOne({
            _id: ObjectID(payload.subj)
        });

        if (!user) {
            return done(null, false);
        }

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

//LOCAL STRATEGY
passport.use('local', new localStrategy({
    usernameField: 'email'
}, async (username, password, done) => {
    try {
        email = username.toLowerCase();
        const user = await pass.database.collection('Users').findOne({
            email,
            confirmation: true,
        });

        let error = false;

        if (!user) {
            done(null, {error: 'email'});
            error = true;
        }

        const isValid = await bcrypt.uncrypt(password, user.password);

        if (!isValid) {
            done(null, {error: 'password'});
            error = true;
        }
        if(!error) {
            done(null, user);
        }
    } catch (err) {
        done(error, user)
    }
}));

module.exports = pass;