const express=require('express');
const auth = require('../MiddleWare/AuthValidate');
const { getProductReviews } = require('../Controller/viewReviewController');
const router=express.Router();

router.get("/get-all-review/:id", auth, getProductReviews);

module.exports=router;