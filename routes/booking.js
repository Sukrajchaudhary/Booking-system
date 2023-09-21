const express = require("express");
const {
  createBookingNo,
  getAllBookingNo,
  updateBookingno,
} = require("../controller/Booking");
const router = express.Router();
router
  .post("/api/bookingno", createBookingNo)
  .get("/api/allbookingno", getAllBookingNo)
  .patch("/api/updatebookingno", updateBookingno);

exports.router = router;
