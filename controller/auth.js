const { User } = require("../modals/auth");

exports.createUsers = async (req, res) => {
  console.log(req.body)
  try {
    const user = new User(req.body);
    const response = await user.save();
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send("Sorry, this email doesn't exist!");
    }
    if (req.body.password !== user.password) {
      return res.status(400).send("Invald credentials");
    }

    return res.status(200).send("Login Successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

