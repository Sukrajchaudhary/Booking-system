
const express=require('express')
const {createUsers, loginUser, checkUser} =require('../controller/auth')
const router=express.Router();
const passport = require("passport");
router.post("/api/auth/signup",createUsers).
post('/api/auth/login',passport.authenticate('local'), loginUser).
get('/api/auth/checkuser',passport.authenticate('jwt'),checkUser)
exports.router=router