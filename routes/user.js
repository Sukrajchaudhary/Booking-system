
const express=require('express')
const {updateUserByid} =require('../controller/user')
const router=express.Router();
router.patch("/updateuser",updateUserByid)
exports.router=router