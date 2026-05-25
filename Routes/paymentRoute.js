const express=require('express');
const {createPayment, updateOrderStatus } = require('../Controller/paymentController');
const auth = require('../MiddleWare/AuthValidate');
const router=express.Router();
 
router.post('/create',auth,createPayment);
router.put('/order-status/:id',auth,updateOrderStatus);
module.exports=router;