const express=require('express');
const {validateResetToken } = require('../Controller/resetPasswordController');
const { forgotPassword } = require('../Controller/forgotPasswordController');
const changePassword=require('../Dto/ChangePasswordDto');
const validate = require('../MiddleWare/validation');
const router=express.Router();

router.post('/change-password',forgotPassword);
router.get("/validate-reset-token/:token", validateResetToken);

module.exports=router;