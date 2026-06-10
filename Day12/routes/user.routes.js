const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.models");
const nodemailer = require("nodemailer");
require("dotenv").config();
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blacklistToken.model");
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const UserRouter = express.Router();

UserRouter.post("/signup", (req, res) => {
  console.log(req.body);
  try {
    // const { email, password } = req.body;
    const myPlaintextPassword = req.body.password;
    bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.status(500).json({ message: "Error In Signup..." });
      } else {
        console.log(myPlaintextPassword, "----->", hash);
        await userModel.create({ ...req.body, password: hash });
        res.json({ message: "signup sucess" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error In Signup..." });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const myPlaintextPassword = req.body.password;
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "User Not Found,  Please Signup" });
    } else {
      const hash = user.password;
      bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
        // result == true
        if (err) {
          res.status(500).json({ message: "Error In Login..." });
        } else {
          if (result) {
            var accessToken = jwt.sign(
              { userId: user._id, role: user.role },
              "shhhhh",
              { expiresIn: 30 },
            );
            var RefreshToken = jwt.sign(
              { userId: user._id, role: user.role },
              "shhhhh",
              { expiresIn: 60 },
            );

            res
              .status(200)
              .json({ message: "Login Sucess", accessToken, RefreshToken });
          } else {
            res.status(401).json({ message: "Wrong Password" });
          }
        }
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error In Login..." });
  }
});

UserRouter.post("/newaccesstoken", (req, res) => {
  res.json({ message: "This is access token route" });
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.GOOGLE_USER_EMAIL,
    pass: process.env.GOOGLE_USER_PASSWORD,
  },
});

UserRouter.get("/sendmail", async (req, res) => {
  const info = await transporter.sendMail({
    from: "Roshan Kumar",
    to: "roshankumar33870@gmail.com",
    subject: "This is testing email",
    text: "Hello world in Text",
    // html:"<b>Hello World in HTML<b>"
  });
  console.log("Message sent:", info.messageId);

  res.status(200).json({ message: "Email Sent" });
});

UserRouter.post("/forget-password", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({ message: "User Not Found, Please Signup" });
  } else {
    let resetPasswordToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: 300 },
    );

    let resetPasswordLink = `http://localhost:5000/users/reset-password?token=${resetPasswordToken}`;

    await transporter.sendMail({
      from: "Roshan Kumar",
      to: user.email,
      subject: "Password rest link email",
      html:`
      <h5>This is password link, which is expires within 5mins</h5>
      <h3>This is Reset Link ${resetPasswordLink}</h3>
      `
    });
    res
      .status(200)
      .json({
        message: "Password Reset Link is sent to mail",
        resetPasswordLink,
      });
  }
});

UserRouter.post("/reset-password", async (req, res) => {
  try {
    const { token } = req.query;
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      let user = await userModel.findById(decoded.userId);
      user.password = req.body.newPassword;
      bcrypt.hash(req.body.newPassword, saltRounds, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          res.status(500).json({ message: "Error In Reset..." });
        } else {
          user.password = hash;
          await user.save();
          await blackListTokenModel.create({token})
          res.json({ message: "Password Reset Successful" });
        }
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in Reset", errmessage: err.message });
  }
});
module.exports = UserRouter;
