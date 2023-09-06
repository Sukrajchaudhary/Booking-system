require('dotenv').config()
const express = require('express');
const server = express();
const PORT = 8080;
const { connectToDb } = require('./db'); 
const bookingRouter=require('./routes/booking')
const  authRouter=require('./routes/auth')
const userBooking=require('./routes/userBooking');
const userRouter=require('./routes/user')
//middlewares
server.use(express.json());
server.get('/', (req, res) => {
    res.send("Hello Sukraj");
});


server.use("/",authRouter.router);
server.use('/',bookingRouter.router);
server.use('/',userBooking.router)
server.use('/',userRouter.router)
connectToDb(); 
server.listen(process.env.PORT, () => {
    console.log("Server is running on Port 8080");
});
