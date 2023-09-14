
const express=require('express')
const {createUsers, loginUser, checkUser, resetPasswordRequest,resetPassword} =require('../controller/auth')
const router=express.Router();
const passport = require("passport");
router.post("/api/auth/signup",createUsers).
post('/api/auth/login',passport.authenticate('local'), loginUser).
get('/api/auth/checkuser',passport.authenticate('jwt'),checkUser)
.post('/reset-password-request',resetPasswordRequest)
.post('/reset-password',resetPassword);
exports.router=router