const { User } = require("../modals/auth");
const crypto = require("crypto");
const { sanitizer } = require("../services/common");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

exports.createUsers = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).json({ message: "User  with these email already exists !" });
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
          return res.status(200).json({ message: "Password hashing failed" });
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
           res.status(201)
              .json({user:sanitizer(user),token:token});
          }
        });
      }
    );
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.loginUser = async (req, res) => {
 res
  .status(201)
  .json({token:req.user});
};
exports.checkUser = async (req, res) => {
  res.json({ user: req.user });
};
