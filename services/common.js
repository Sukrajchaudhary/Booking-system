const passport = require("passport");
const nodemailer = require("nodemailer");

// Middleware for authentication
exports.isAuth = () => {
  return passport.authenticate('jwt');
};

exports.sanitizer = (user) => {
  return { id: user.id, role: user.role, username: user.username };
};

exports.cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  return token;
};


// For Email systems
"use strict";

const transporter= nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: 'sukrajchaudhary90@gmail.com',
    pass: process.env.PASS
  },
});
exports.Mailsend=async function({email,subject,text,html}){
  const info = await transporter.sendMail({
    from: '"Nozza 👻" <nozza@luckydraw.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });
  return  ` Reset Mail has been sent successfully to ${info.accepted}`;
}