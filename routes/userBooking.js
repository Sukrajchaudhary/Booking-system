const express = require("express");
const {
  userBooking,
  getuserBookingByid,
} = require("../controller/userBooking");
const router = express.Router();
router
  .post("/api/booking", userBooking)
  .get("/api/booking", getuserBookingByid)
 

exports.router = router;
