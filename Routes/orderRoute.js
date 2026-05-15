const express=require('express');
const auth = require('../MiddleWare/AuthValidate');
const { addCart, getCartByUser, deleteCart } = require('../Controller/orderController');
const router=express.Router();

router.post('/add-cart',auth,addCart);
router.get('/get-cart-by-user/:id',auth,getCartByUser);
router.delete('/delete-cart/:id',auth,deleteCart);

module.exports=router;