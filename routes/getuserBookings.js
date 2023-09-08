const express = require("express");
const {
  getuserBookingByid,
  updateuserBookingByid,
  getalluserBooking,
} = require("../controller/userBooking");
const router = express.Router();
router
  
  .patch("/update", updateuserBookingByid)
  .get("/allbooking", getalluserBooking);

exports.router = router;
