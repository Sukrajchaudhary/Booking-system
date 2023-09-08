const { userBooking } = require("../modals/userBooking");
exports.userBooking = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id);
    const booking = new userBooking({ ...req.body, user: id });
    const result = await booking.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
exports.getalluserBooking = async (req, res) => {
  try {
    let booking = await userBooking.find();
    let totaluserbooking = await userBooking.countDocuments();
    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit, 10);
      const page = parseInt(req.query._page, 10);
      booking = await userBooking
        .find()
        .skip(pageSize * (page - 1))
        .limit(pageSize);
    }
    res.set("X-TOTAL-Count", totaluserbooking);
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.getuserBookingByid = async (req, res) => {
  try {
    const { id } = req.user;
    const booking = await userBooking
      .findOne({ user: id })
      .populate("user", "PhoneNo username")
      .exec();
    if (!booking) {
      return res.status(404).send("Booking not found");
    }
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
exports.updateuserBookingByid = async (req, res) => {
  try {
    const { id } = req.user;
    const booking = await userBooking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
