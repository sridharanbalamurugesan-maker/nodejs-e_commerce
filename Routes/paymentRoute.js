const express=require('express');
const {createPayment } = require('../Controller/paymentController');
const auth = require('../MiddleWare/AuthValidate');
const router=express.Router();
 
router.post('/create',auth,createPayment);
module.exports=router;