const express = require("express");
const {
  updateUserBookingById,
  getalluserBooking,
} = require("../controller/userBooking");
const router = express.Router();
router
  
  .patch("/api/update/status/:id", updateUserBookingById)
  .get("/api/allbooking", getalluserBooking);

exports.router = router;
