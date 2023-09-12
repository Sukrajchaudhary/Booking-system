
const express=require('express')
const {createBookingNo, getAllBookingNo} =require('../controller/Booking')
const router=express.Router();
router.post("/api/bookingno",createBookingNo)
.get("/api/allbookingno",getAllBookingNo)

exports.router=router