const { userBooking } = require("../modals/userBooking");
exports.userBooking = async (req, res) => {
  try {
    const booking = new userBooking(req.body);
     await booking.save();
    return res.status(201).send({message:"Your information Added Successsfully!!"});
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
exports.getalluserBooking = async (req, res) => {
  try {
    let booking;
    let totaluserbooking;

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit, 10);
      const page = parseInt(req.query._page, 10);

      booking = await userBooking
        .find()
        .skip(pageSize * (page - 1))
        .limit(pageSize)
      

      totaluserbooking = await userBooking.countDocuments();
    } else {
      booking = await userBooking.find(); 
      totaluserbooking = booking.length; 
    }

    res.set("X-TOTAL-Count", totaluserbooking);
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};


exports.getuserBookingByid = async (req, res) => {
  try {
    const booking = await userBooking
      .findOne()
      .exec();
    if (!booking) {
      return res.status(404).send("Booking not found");
    }
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
exports.updateUserBookingById = async (req, res) => {
  try {
    const {id}= req.params;
    const booking = await userBooking.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
