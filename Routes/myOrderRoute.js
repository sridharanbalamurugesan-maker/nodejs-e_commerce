const express=require('express');
const auth = require('../MiddleWare/AuthValidate');
const { getAllOrders, editOrder } = require('../Controller/myOrderController');
const createUploads = require('../MiddleWare/multerUpload');
const reviewUpload=createUploads('review');
const router=express.Router();

router.get('/get-all-order',auth,getAllOrders);
router.put('/edit-order/:id',auth,reviewUpload.array("images",5),editOrder);

module.exports=router;