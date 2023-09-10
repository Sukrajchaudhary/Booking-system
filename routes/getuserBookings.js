const express = require("express");
const {
  updateuserBookingByid,
  getalluserBooking,
} = require("../controller/userBooking");
const router = express.Router();
router
  
  .patch("/update/status", updateuserBookingByid)
  .get("/allbooking", getalluserBooking);

exports.router = router;
