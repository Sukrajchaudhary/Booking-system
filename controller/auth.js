const { User } = require("../modals/auth");
const crypto = require("crypto");
const { sanitizer, Mailsend } = require("../services/common");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

exports.createUsers = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User  with these email already exists !" });
    }

    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (err) {
          return res.status(200).json({ message: "Password  failed" });
        }

        const user = new User({
          ...req.body,
          password: hashedPassword,
          salt: salt,
        });

        const response = await user.save();
        req.login(sanitizer(user), (err) => {
          if (err) {
            return res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizer(response), SECRET_KEY);
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true,
              })
              .status(201)
              .json({ user: sanitizer(user), token: token });
          }
        });
      }
    );
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.loginUser = async (req, res) => {
  res.status(200).json(req.user);
};
exports.checkUser = async (req, res) => {
  res.json(req.user);
};

exports.resetPasswordRequest = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user) {
      const token = crypto.randomBytes(48).toString("hex");
      user.resetPasswordToken = token;
      await user.save();
      const resetPage =
        "http://localhost:3000/reset-password?token=" +
        token +
        "&email=" +
        email;
      const subject = "Reset Password for Nozza";
      const html = `<p>Click here <a href='${resetPage}' </a> for reset a passsword !`;
      const response = await Mailsend({
        email: email,
        subject: subject,
        html: html,
      });
      res.json(response);
    } else {
      res
        .status(200)
        .send({ message: "Please Enter a email you use while signup !!" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
// for ressetting passwords
exports.resetPassword = async (req, res) => {
  const { email, password, token } = req.body;
  const user = await User.findOne({ email: email, resetPasswordToken: token });
  if (user) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        user.password = hashedPassword;
        user.salt = salt;
        await user.save();
        const subject = " Password SuccessFully reset ";
        const html = `<p>SuccessFully reset Password</p>`;
        if (email) {
          const response = await Mailsend({ email: email, subject, html });
          res.json(response);
        } else {
          res.json("something went wrong while sending mail!!");
        }
      }
    );
  } else {
    res.status(200).send({ message: "something went wrong!!!!" });
  }
};
