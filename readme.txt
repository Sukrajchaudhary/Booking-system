Booking:
1. Post/api/bookingno    //for creating bookingno:
2.GET/api/allbookingno?_page=1&_limit=5 // for getting all booking No:

-------------------------------------------------
3.Post/api/auth/signup
{
  "username":"",
  "password":"",
  "email":""
  }
4.Post/api/auth/login
{
  "password":"",
  "email":""
}
5.GET/api/auth/checkuser .
=>IT retun user information:

----------------------------
Admin
----------------------------
6.PATCH//api/update/status/booking_id . //FOR updating user booking status by admin
{
  "status": "booked"
}
7.GET/api/allbooking.   //for getting all users booking in Admin pannel

8.POST8080/api/booking  // These API is for user Booking
{
  "BookingNo": Number choose by user which number he want
}
9.GET /api/booking  //These API is user for getting user booking number in their own user admin pannel
