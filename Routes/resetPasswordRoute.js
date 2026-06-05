const express=require('express');
const { resetPassword, logedinResetPassword } = require('../Controller/resetPasswordController');
const auth = require('../MiddleWare/AuthValidate');
const validate = require('../MiddleWare/validation');
const changePassword=require('../Dto/ChangePasswordDto');
const router=express.Router();

router.post('/reset-password/:token',resetPassword)
router.post('/reset-password',auth,validate(changePassword),logedinResetPassword);

module.exports=router;