
const express=require('express')
const {createUsers, loginUser} =require('../controller/auth')
const router=express.Router();
router.post("/signup",createUsers).
post('/login',loginUser)
exports.router=router