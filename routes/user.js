
const express=require('express')
const {updateUserByid} =require('../controller/user')
const router=express.Router();
router.patch("/updateuser/:id",updateUserByid)
exports.router=router