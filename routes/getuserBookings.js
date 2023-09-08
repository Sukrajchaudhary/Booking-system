const express = require("express");
const {
  getuserBookingByid,
  updateuserBookingByid,
  getalluserBooking,
} = require("../controller/userBooking");
const router = express.Router();
router
  
  .patch("/update/:id", updateuserBookingByid)
  .get("/allbooking", getalluserBooking);

exports.router = router;
