
const express=require('express')
const {createBookingNo, getAllBookingNo} =require('../controller/Booking')
const router=express.Router();
router.post("/bookingno",createBookingNo)
.get("/allno",getAllBookingNo)

exports.router=router