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



------------------------
//for forget password
------------------------
1.POST/reset-password-request ;
{
  "email:"registred email"
}
2.POST/reset-password

  {
  "email":"sukrajchaudhary90@gmail.com",
  "token":"Got to you mail inbox and click in link and see in address bar you will see token siply copy and past here for testing in backend only",
  "password":"Password@1234567890"
}
----------------------------------------------------------------------------------------
Note:use these for getting token and email from url in front-end while sending from front-end
------------------------------------------------------------
const query=new URLSearchParams(window.location.search);
const token=query.get('token');
const email=query.get('email');
---------------------------------------







-----------------
New update
---------------
1.POST /api/booking    //when user click on buynow button and show these form and also payment information.
{
  "BookingNo":[12,13,15,16],
  "name":"suk",
  "contact":9809521702
}

2.GET /api/allbooking   // for showing user infromation in admin pannel.