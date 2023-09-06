const { Booking } = require("../modals/booking");
exports.createBookingNo = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const result = await booking.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
exports.getAllBookingNo = async (req, res) => {
  try {
    let bookings = await Booking.find();
    const totalBooking = await Booking.countDocuments();

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit, 10);
      const page = parseInt(req.query._page, 10);
      bookings = await Booking.find()
        .skip(pageSize * (page - 1))
        .limit(pageSize);
    }

    res.set("X-TOTAL-Count", totalBooking);
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
