const { User } = require("../modals/auth");
const crypto = require("crypto");
const { sanitizer } = require("../services/common");
const jwt = require("jsonwebtoken");
const SECRET_KEY=process.env.SECRET_KEY
exports.createUsers = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({
          ...req.body,
          role: "user",
          password: hashedPassword,
          salt: salt,
        });
        const response = await user.save();
        req.login(sanitizer(user), (err) => {
          if (err) {
            return res.status(400).json(err);
          } else {
            const token=jwt.sign(sanitizer(response),SECRET_KEY)
            return res.status(201).json({token});
          }
        });
      }
    );
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.loginUser = async (req, res) => {
  res.json(req.user);
};
exports.checkUser = async (req, res) => {
  res.json({message:"success",user:req.user});
};
