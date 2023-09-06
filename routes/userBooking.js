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
  .get("/booking/:id", getuserBookingByid)
  .patch("/update/:id", updateuserBookingByid)
  .get("/allbooking", getalluserBooking);

exports.router = router;
