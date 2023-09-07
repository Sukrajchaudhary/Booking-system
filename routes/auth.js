
const express=require('express')
const {createUsers, loginUser, checkUser} =require('../controller/auth')
const router=express.Router();
const passport = require("passport");
router.post("/signup",createUsers).
post('/login',passport.authenticate('local'), loginUser).
get('/checkuser',passport.authenticate('jwt'),checkUser)
exports.router=router