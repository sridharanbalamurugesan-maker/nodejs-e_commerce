const express=require('express');
const userController=require('../Controller/userController');
const router=express.Router();
const validate=require('../MiddleWare/validation');
const registerDto = require('../Dto/registerDto');
const auth = require('../MiddleWare/AuthValidate');



router.post('/register',validate(registerDto),userController.registerUser);
router.post('/login',userController.login);
router.get('/get-all-users',auth,userController.getAllUser);
router.put('/block-user/:id',auth,userController.blockUser);
module.exports=router; 