const  {User}=require('../modals/auth')
exports.updateUserByid = async (req, res) => {
    try {
      const { id } = req.user;
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };
  