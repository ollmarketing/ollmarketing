const { ObjectID } = require("mongodb");
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
const bcrypt = require("../../bcrypt");

generateToken = (id) => {
  return JWT.sign(
    {
      iss: "Degram",
      subj: id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.JWT_SECRET_KEY
  );
};

module.exports = {
  getCollection: (req, res, next) => {
    req.Users = req.app.database.collection("Users");
    next();
  },

  confirmation: async (req, res) => {
    const cryptedId = generateToken(req.body._id);
    const link = `${req.body.location}/confirmation/${cryptedId}`;
    const email = req.body.email;
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      auth: {
        user: process.env.SMTP_MAIL_LOGIN,
        pass: process.env.SMTP_MAIL_PASSWORD,
      },
    });
    let result = await transporter.sendMail({
      from: "support@oring.com",
      to: email,
      subject: "Confirmation Oring account",
      sender: "Oring",
      html: `Confirm your email address to get started on Oring<br>Once you’ve confirmed your email address, you can access all our products.<br><br>
            <form action="${link}">
              <button type="submit">Confirm account</button>
            </form>
            <br>
            Oring support team
            `,
    });

    res.status(200).json(result);
  },

  changePassword: async (req, res) => {
    const email = req.body.email;
    const user = await req.Users.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({ message: "user not exist" });
    }

    const cryptedId = generateToken(user._id);
    const link = `${req.body.location}/changePassword/${cryptedId}`;
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      auth: {
        user: process.env.SMTP_MAIL_LOGIN,
        pass: process.env.SMTP_MAIL_PASSWORD,
      },
    });

    let result = await transporter.sendMail({
      from: "support@oring.com",
      to: email,
      subject: "Password Reset Request",
      sender: "Oring",
      html: `Click the button below to change the password for your Oring account.<br><br>
          <form action="${link}">
            <button type="submit">Change password</button>
          </form>
          <br>
          Oring support team
          `,
    });

    res.status(200).json(result);
  },
};
