1.http://localhost:8080/bookingno 
=>These API is used to create booking No: It only take thease paramaters {"BookingNo": creating num};
2.http://localhost:8080/signup
=>These API is used for creating user account : for creating Account it takes following parameters :
{ 
  "username":"Sukraj Chaudhary",
  "email": "bijay90@gmail.com",
  "password": ""

}
3.http://localhost:8080/login
=> these API is used for login and it takes following parameters 
{ 
  "email": "bijay90@gmail.com",
  "password": ""

}
4.GET method :http://localhost:8080/checkuser
=>These API is user for checking user status
5.http://localhost:8080/booking
=>These API is use for if user want to book a number and These Takes a parameters:
{
  "BookingNo":112
  And Needs Barrer Token which is returned while login or signup
}
6.http://localhost:8080/booking
=>These api is use for Getting  users own booking in user Admin pannel but it needs a Barer token


7.http://localhost:8080/allno?_page=1&_limit=7
=>These API is used for getting all booking number which shows in front-end 

///*for Admin pANNEL *//////

1.http://localhost:8080/allbooking?_page=1&_limit=5  
=>These API is used by Admi For Getting All users Booking In admin pannel
Note:it also Need a Barre Token
2.http://localhost:8080/update
=> These Api is used for updaing user booking status 
Note:it also need a Barrer Token and it takes a parameters  like these
{
  "status": "pending"
}
