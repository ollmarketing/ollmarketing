const JWT = require("jsonwebtoken");
require("dotenv").config();
const { ObjectID } = require("mongodb");
const bcrypt = require("../../bcrypt");
const helper = require("../../helper");

(generateToken = (user) => {
  return JWT.sign(
    {
      iss: "Degram",
      subj: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.JWT_SECRET_KEY
  );
}),
  (generateAdminToken = (user) => {
    return JWT.sign(
      {
        iss: "Degram",
        subj: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
      },
      process.env.ADMIN_TOKEN
    );
  }),
  (module.exports = {
    getCollection: (req, res, next) => {
      req.Users = req.app.database.collection("Users");
      req.Transactions = req.app.database.collection("Transactions")
      next();
    },

    signUp: async (req, res) => {
      const user = req.body;
      user.email = user.email.toLowerCase();

      const userExist = await req.Users.findOne({
        email: user.email,
      });

      if (userExist) {
        return res.status(400).json({
          error: "email already exists",
        });
      }

      delete user.passwordConfirmation;

      user.confirmation = false;
      user.createdAt = new Date();
      user.password = await bcrypt.crypt(user.password);

      await req.Users.insertOne(user);
      const token = generateToken(user);

      res.status(200).json({
        token,
        user,
      });
    },

    signIn: (req, res) => {
      const error = req.user.error;

      if (error) {
        res.status(401).json({ error });
      } else {
        const token = generateToken(req.user);
        let admin = undefined;

        if (req.user.isAdmin) {
          admin = generateAdminToken(req.user);
        }

        res.status(200).json({ token, admin, user: req.user });
      }
    },

    
    authCheck: (req, res) => {
      res.status(200).json({ OK: "OK" });
    },

    confirmation: async (req, res) => {
      const jwtDecodeRes = JWT.decode(req.params.id, {}, process.env.JWT_SECRET_KEY)
      const id = jwtDecodeRes.subj;

      const updatedUser = await req.Users.findOneAndUpdate({
        _id: ObjectID(id),
      }, {$set: {
        confirmation: true,
      }});

      if(!updatedUser) {
        return res.status(400).json({error: "user is not exist"});
      }

      const token = generateToken(updatedUser)

      res.status(200).json({token, user: updatedUser.value});
    },

    getUsers: async (req, res) => {
      const users = await req.Users.find().toArray();

      res.status(200).json([users])
    },

    getPaidUsers: async (req, res) => {
      const users = await req.Users.find().toArray();
      const transactions = await req.Transactions.find().toArray();
      const paidUsers = [];
      
      for(const ukey in users) {
        for(const tkey in transactions) {
          if(String(users[ukey]._id) === String(transactions[tkey].userId) && transactions[tkey].status === 'CONFIRMED') {

            for(const key in paidUsers) {
              if(String(paidUsers[key]._id) === String(users[ukey]._id)) {
                paidUsers[key].plans.push(
                  {description: transactions[tkey].description, date: transactions[tkey].createdAt}
                )
              } else {
                paidUsers.push(
                  Object.assign(users[ukey], {plans: [{description: transactions[tkey].description, date: transactions[tkey].createdAt}]})
                )
              }
            }

            if(paidUsers.length === 0) {
              paidUsers.push(
                Object.assign(users[ukey], {plans: [{description: transactions[tkey].description, date: transactions[tkey].createdAt}]})
              )
            }
            

          }
        }
      }
      res.status(200).json([paidUsers])
    },


    getUserIdViaJWT: async (req, res) => {
      const jwtDecodeRes = JWT.decode(req.params.id, {}, process.env.JWT_SECRET_KEY)
      const id = jwtDecodeRes.subj;

      res.status(200).json({id});
    },

    changePassword: async (req, res) => {
      const userId = req.params.id; 

      const user = await req.Users.findOne({
        _id: ObjectID(userId),
      });

      const cryptedNewPassword = await bcrypt.crypt(req.body.password);

      await req.Users.updateOne(
        {
          _id: ObjectID(userId),
        },
        {
          $set: {
            password: cryptedNewPassword,
          },
        }
      );

      res.status(200).json({ OK: "Password successfully changed" });
    },

  });

  
