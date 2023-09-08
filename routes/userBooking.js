const express = require("express");
const {
  userBooking,
  getuserBookingByid,
  updateuserBookingByid,
  getalluserBooking,
} = require("../controller/userBooking");
const router = express.Router();
router
  .post("/booking", userBooking)
  .get("/booking", getuserBookingByid)
 

exports.router = router;
