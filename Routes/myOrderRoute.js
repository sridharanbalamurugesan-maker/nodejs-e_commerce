const express=require('express');
const auth = require('../MiddleWare/AuthValidate');
const { getAllOrders, editOrder } = require('../Controller/myOrderController');
const router=express.Router();

router.get('/get-all-order',auth,getAllOrders);
router.put('/edit-order/:id',auth,editOrder);

module.exports=router;