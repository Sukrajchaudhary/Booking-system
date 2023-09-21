const { Booking } = require("../modals/booking");
exports.createBookingNo = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const result = await booking.save();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(200).send({ message: "Booking number exists" });
  }
};

exports.getAllBookingNo = async (req, res) => {
  try {
    let query = Booking.find();

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit, 10);
      const page = parseInt(req.query._page, 10);

      query = query
        .skip(pageSize * (page - 1))
        .limit(pageSize);
    }

    if (req.query._sort && req.query._order) {
      const sortField = req.query._sort;
      const sortOrder = req.query._order === 'asc' ? 1 : -1;
      query = query.sort({ [sortField]: sortOrder });
    }

    const bookings = await query.exec();
    const totalBooking = await Booking.countDocuments();

    res.set("X-TOTAL-Count", totalBooking);
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};


exports.getAllBookingNo = async (req, res) => {
  try {
    let query = Booking.find();

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit, 10);
      const page = parseInt(req.query._page, 10);

      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const defaultSortField = "BookingNo";
    const defaultSortOrder = 1;

    const sortField = req.query._sort || defaultSortField;
    const sortOrder = req.query._order === "desc" ? -1 : defaultSortOrder;

    query = query.sort({ [sortField]: sortOrder });

    const bookings = await query.exec();
    const totalBooking = await Booking.countDocuments();

    res.set("X-TOTAL-Count", totalBooking);
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};


exports.updateBookingno = async (req, res) => {
  try {
    const { ids, status } = req.body;

    // Ensure that ids is an array
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: "ids should be an array" });
    }

    // Update each document by its ID
    const updatePromises = ids.map(async (id) => {
      await Booking.findByIdAndUpdate({ _id: id }, { status: status });
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    return res.status(200).json({ success: "Updated Successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
